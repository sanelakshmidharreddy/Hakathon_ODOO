# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import UserError

class SunpowerOrder(models.Model):
    _name = 'sunpower.order'
    _description = 'SunPower Confirmed Sales Order'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'create_date DESC, id DESC'

    name = fields.Char(string='Order Reference', required=True, copy=False, readonly=True, default=lambda self: _('New'))
    quote_id = fields.Many2one('sunpower.quote', string='Quotation', tracking=True)
    lead_id = fields.Many2one('sunpower.lead', string='Originating Lead', tracking=True)
    customer_id = fields.Many2one('sunpower.customer', string='Customer', required=True, tracking=True)

    system_type = fields.Selection([
        ('on_grid', 'On-Grid System (Net-Metered)'),
        ('off_grid', 'Off-Grid System (Battery Storage)'),
        ('hybrid', 'Hybrid Solar System')
    ], string='System Type', default='off_grid', required=True)

    capacity = fields.Float(string='System Capacity (kW)', default=5.0, required=True)
    
    total_amount = fields.Float(string='Order Total (₹)', required=True, default=0.0, tracking=True)
    advance_amount = fields.Float(string='Required Advance (₹)', default=0.0)
    paid_amount = fields.Float(string='Amount Paid (₹)', compute='_compute_payments', store=True)
    balance_amount = fields.Float(string='Balance Due (₹)', compute='_compute_payments', store=True)

    state = fields.Selection([
        ('confirmed', 'Order Confirmed'),
        ('reserved', 'Equipment Reserved in Warehouse'),
        ('dispatched', 'Dispatched / In-Transit'),
        ('installed', 'Installed & Tested'),
        ('completed', 'Commissioned & Completed'),
        ('cancelled', 'Cancelled')
    ], string='Order Status', default='confirmed', required=True, tracking=True)

    # Relational Handlers
    dispatch_ids = fields.One2many('sunpower.dispatch', 'order_id', string='Dispatch Manifests')
    job_ids = fields.One2many('sunpower.job', 'order_id', string='Field Installation Jobs')
    invoice_ids = fields.One2many('sunpower.invoice', 'order_id', string='Customer Invoices')
    warranty_ids = fields.One2many('sunpower.warranty', 'order_id', string='Serial Warranties')
    subsidy_ids = fields.One2many('sunpower.subsidy', 'order_id', string='Government Subsidies')
    reserved_serial_ids = fields.One2many('sunpower.inventory.serial', 'reserved_order_id', string='Reserved Serials')

    dispatch_count = fields.Integer(string='Dispatches', compute='_compute_counts')
    job_count = fields.Integer(string='Installation Jobs', compute='_compute_counts')
    invoice_count = fields.Integer(string='Invoices', compute='_compute_counts')
    warranty_count = fields.Integer(string='Warranties', compute='_compute_counts')

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('name', _('New')) == _('New'):
                vals['name'] = self.env['ir.sequence'].next_by_code('sunpower.order') or _('New')
        return super(SunpowerOrder, self).create(vals_list)

    @api.depends('invoice_ids.amount_paid', 'total_amount')
    def _compute_payments(self):
        for rec in self:
            paid = sum(inv.amount_paid for inv in rec.invoice_ids)
            rec.paid_amount = paid
            rec.balance_amount = max(0.0, rec.total_amount - paid)

    @api.depends('dispatch_ids', 'job_ids', 'invoice_ids', 'warranty_ids')
    def _compute_counts(self):
        for rec in self:
            rec.dispatch_count = len(rec.dispatch_ids)
            rec.job_count = len(rec.job_ids)
            rec.invoice_count = len(rec.invoice_ids)
            rec.warranty_count = len(rec.warranty_ids)

    def action_reserve_inventory(self):
        """Auto-reserves serial numbers in warehouse inventory for this project"""
        self.ensure_one()
        Serial = self.env['sunpower.inventory.serial']
        
        # Reserve panels (approx capacity * 2.5)
        panel_needed = int(round(self.capacity * 2.5))
        avail_panels = Serial.search([('product_id.category', '=', 'panel'), ('status', '=', 'in_stock')], limit=panel_needed)
        for p in avail_panels:
            p.write({'status': 'reserved', 'reserved_order_id': self.id})

        # Reserve inverter
        avail_inverter = Serial.search([('product_id.category', '=', 'inverter'), ('status', '=', 'in_stock')], limit=1)
        if avail_inverter:
            avail_inverter.write({'status': 'reserved', 'reserved_order_id': self.id})

        # Reserve battery if Off-Grid
        if self.system_type in ('off_grid', 'hybrid'):
            avail_battery = Serial.search([('product_id.category', '=', 'battery'), ('status', '=', 'in_stock')], limit=1)
            if avail_battery:
                avail_battery.write({'status': 'reserved', 'reserved_order_id': self.id})

        self.write({'state': 'reserved'})
        self.message_post(body=_("Equipment serials reserved in warehouse for %s kW %s system.") % (self.capacity, self.system_type))
        return True

    def action_create_dispatch(self):
        """Generates dispatch manifest for warehouse barcode verification"""
        self.ensure_one()
        dispatch = self.env['sunpower.dispatch'].create({
            'order_id': self.id,
            'customer_id': self.customer_id.id,
            'warehouse_user_id': self.env.user.id,
            'dispatch_date': fields.Date.today(),
            'state': 'scanning',
        })
        # Prepopulate dispatch lines from quote/order products
        if self.quote_id:
            for ql in self.quote_id.quote_line_ids:
                self.env['sunpower.dispatch.line'].create({
                    'dispatch_id': dispatch.id,
                    'product_id': ql.product_id.id,
                    'quantity_required': ql.quantity,
                })
        return {
            'name': _('Warehouse Dispatch Manifest'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.dispatch',
            'res_id': dispatch.id,
            'view_mode': 'form',
            'target': 'current',
        }

    def action_create_job(self):
        """Generates technician installation job"""
        self.ensure_one()
        job = self.env['sunpower.job'].create({
            'order_id': self.id,
            'customer_id': self.customer_id.id,
            'scheduled_date': fields.Date.today(),
            'installed_capacity': self.capacity,
            'state': 'assigned',
        })
        return {
            'name': _('Installation Job'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.job',
            'res_id': job.id,
            'view_mode': 'form',
            'target': 'current',
        }

    def action_create_invoice(self):
        """Generates invoice for order"""
        self.ensure_one()
        invoice = self.env['sunpower.invoice'].create({
            'order_id': self.id,
            'customer_id': self.customer_id.id,
            'amount_total': self.total_amount,
            'amount_paid': 0.0,
            'invoice_date': fields.Date.today(),
            'state': 'draft',
        })
        return {
            'name': _('Customer Invoice'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.invoice',
            'res_id': invoice.id,
            'view_mode': 'form',
            'target': 'current',
        }
