# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import UserError, ValidationError
from datetime import timedelta

class SunpowerDispatch(models.Model):
    _name = 'sunpower.dispatch'
    _description = 'SunPower Warehouse Equipment Dispatch & QR Manifest'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'create_date DESC, id DESC'

    name = fields.Char(string='Manifest Number', required=True, copy=False, readonly=True, default=lambda self: _('New'))
    order_id = fields.Many2one('sunpower.order', string='Sales Order', required=True, tracking=True)
    customer_id = fields.Many2one('sunpower.customer', string='Recipient Customer', related='order_id.customer_id', store=True)

    warehouse_user_id = fields.Many2one('res.users', string='Dispatch Officer', default=lambda self: self.env.user, required=True, tracking=True)
    dispatch_date = fields.Date(string='Dispatch Date', default=fields.Date.today, required=True, tracking=True)
    
    vehicle_number = fields.Char(string='Delivery Truck / Vehicle No.', default='TN-09-AB-4021')
    driver_phone = fields.Char(string='Driver Contact No.', default='9876543210')

    dispatch_line_ids = fields.One2many('sunpower.dispatch.line', 'dispatch_id', string='Dispatch Items')
    state = fields.Selection([
        ('draft', 'Draft Manifest'),
        ('scanning', 'Barcode / QR Verification'),
        ('ready', 'Verified & Staged for Delivery'),
        ('dispatched', 'Dispatched / In Transit'),
        ('delivered', 'Delivered at Customer Site')
    ], string='Dispatch Status', default='scanning', required=True, tracking=True)

    all_serials_scanned = fields.Boolean(string='All Serials Verified', compute='_compute_all_scanned')
    warranty_ids = fields.One2many('sunpower.warranty', 'dispatch_id', string='Triggered Warranties')

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('name', _('New')) == _('New'):
                vals['name'] = self.env['ir.sequence'].next_by_code('sunpower.dispatch') or _('New')
        return super(SunpowerDispatch, self).create(vals_list)

    @api.depends('dispatch_line_ids.is_complete')
    def _compute_all_scanned(self):
        for rec in self:
            rec.all_serials_scanned = bool(rec.dispatch_line_ids) and all(line.is_complete for line in rec.dispatch_line_ids)

    def scan_serial_barcode(self, barcode_str):
        """API method called by OWL Barcode/QR Scanner widget"""
        self.ensure_one()
        barcode_clean = (barcode_str or '').strip().upper()
        if not barcode_clean:
            return {'status': 'error', 'message': _("Empty barcode scanned.")}

        Serial = self.env['sunpower.inventory.serial']
        serial_rec = Serial.search([('serial_number', '=', barcode_clean)], limit=1)
        if not serial_rec:
            return {'status': 'error', 'message': _("Serial '%s' not recognized in warehouse inventory.") % barcode_clean}

        # Find matching dispatch line
        matching_line = self.dispatch_line_ids.filtered(lambda l: l.product_id == serial_rec.product_id)
        if not matching_line:
            return {'status': 'error', 'message': _("Product '%s' is not part of this dispatch order.") % serial_rec.product_id.name}

        line = matching_line[0]
        if serial_rec in line.scanned_serial_ids:
            return {'status': 'warning', 'message': _("Serial '%s' already scanned for this line.") % barcode_clean}

        if len(line.scanned_serial_ids) >= line.quantity_required:
            return {'status': 'warning', 'message': _("Line '%s' already has required quantity scanned.") % line.product_id.name}

        line.write({'scanned_serial_ids': [(4, serial_rec.id)]})
        serial_rec.write({
            'status': 'dispatched',
            'dispatch_id': self.id,
            'customer_id': self.customer_id.id,
        })

        return {
            'status': 'success',
            'message': _("Verified serial %s for %s") % (barcode_clean, serial_rec.product_id.name),
            'scanned': len(line.scanned_serial_ids),
            'required': line.quantity_required
        }

    def action_confirm_dispatch(self):
        """Dispatches equipment and AUTOMATICALLY triggers digital warranties"""
        self.ensure_one()
        if not self.all_serials_scanned:
            raise UserError(_(
                "Gate Restriction: Cannot confirm dispatch until EVERY required serial number "
                "has been verified with the barcode/QR scanner."
            ))

        Warranty = self.env['sunpower.warranty']
        created_warranties = []
        dispatch_start_date = self.dispatch_date or fields.Date.today()

        for line in self.dispatch_line_ids:
            for serial in line.scanned_serial_ids:
                years = serial.product_id.warranty_years or 2
                # Calculate end date
                end_date = fields.Date.to_date(dispatch_start_date) + timedelta(days=years * 365)
                
                warr = Warranty.create({
                    'serial_id': serial.id,
                    'product_id': serial.product_id.id,
                    'customer_id': self.customer_id.id,
                    'order_id': self.order_id.id,
                    'dispatch_id': self.id,
                    'start_date': dispatch_start_date,
                    'end_date': end_date,
                    'warranty_years': years,
                    'state': 'active',
                })
                serial.write({
                    'status': 'dispatched',
                    'warranty_id': warr.id,
                })
                created_warranties.append(warr)

        self.write({'state': 'dispatched'})
        self.order_id.write({'state': 'dispatched'})

        self.message_post(body=_(
            "Dispatch confirmed! Truck %s en route. %d digital warranties automatically generated with start date %s."
        ) % (self.vehicle_number, len(created_warranties), dispatch_start_date))

        # Auto-create field installation job if not already present
        if not self.order_id.job_ids:
            self.order_id.action_create_job()

        return True
