# -*- coding: utf-8 -*-
from odoo import models, fields, api, _

class SunpowerServiceTicket(models.Model):
    _name = 'sunpower.service.ticket'
    _description = 'SunPower Post-Installation Service & Warranty Ticket'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'create_date DESC, id DESC'

    name = fields.Char(string='Ticket Number', required=True, copy=False, readonly=True, default=lambda self: _('New'))
    customer_id = fields.Many2one('sunpower.customer', string='Customer', required=True, tracking=True)
    job_id = fields.Many2one('sunpower.job', string='Installed Site Job')
    serial_id = fields.Many2one('sunpower.inventory.serial', string='Reported Hardware Serial', tracking=True)
    warranty_id = fields.Many2one('sunpower.warranty', string='Linked Warranty Certificate', tracking=True)

    issue_description = fields.Text(string='Issue Description / Symptoms', required=True)
    fault_code = fields.Selection([
        ('inv_fault', 'Inverter Error E04 (Grid Overvoltage Trip)'),
        ('pan_drop', 'Generation Output Drop > 20%'),
        ('bat_drain', 'Battery Rapid Capacity Depletion'),
        ('cable_cut', 'DC String Wiring / Rodent Damage'),
        ('earthing', 'Earthing Leakage Detected'),
        ('general', 'Routine Cleaning & Inspection')
    ], string='Diagnosis Fault Code', default='inv_fault', required=True, tracking=True)

    state = fields.Selection([
        ('new', 'New Ticket Raised'),
        ('triaged', 'Triaged by Service Desk'),
        ('assigned', 'Technician Dispatched'),
        ('in_progress', 'Site Diagnosis In-Progress'),
        ('waiting_part', 'Waiting for OEM Spare Part'),
        ('resolved', 'Repaired & Generation Restored'),
        ('closed', 'Closed by Customer')
    ], string='Ticket State', default='new', required=True, tracking=True)

    assigned_technician_id = fields.Many2one('res.users', string='Field Service Agent', tracking=True)

    is_under_warranty = fields.Boolean(
        string='Covered Under Active Warranty',
        compute='_compute_warranty_coverage',
        store=True,
        tracking=True
    )

    repair_cost = fields.Float(string='Component Replacement Cost (₹)', default=0.0)
    labour_cost = fields.Float(string='Field Labour Charge (₹)', default=1200.0)
    total_charge = fields.Float(string='Net Customer Invoice Charge (₹)', compute='_compute_charges', store=True)

    replacement_serial_id = fields.Many2one('sunpower.inventory.serial', string='Replacement Asset Serial')
    resolution_notes = fields.Text(string='Technician Resolution Notes')

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('name', _('New')) == _('New'):
                vals['name'] = self.env['ir.sequence'].next_by_code('sunpower.service.ticket') or _('New')
        return super(SunpowerServiceTicket, self).create(vals_list)

    @api.onchange('serial_id')
    def _onchange_serial_id(self):
        if self.serial_id:
            # Auto-link active warranty if present
            warranty = self.env['sunpower.warranty'].search([('serial_id', '=', self.serial_id.id)], limit=1)
            if warranty:
                self.warranty_id = warranty.id
            if self.serial_id.customer_id and not self.customer_id:
                self.customer_id = self.serial_id.customer_id.id

    @api.depends('warranty_id', 'warranty_id.state')
    def _compute_warranty_coverage(self):
        for rec in self:
            rec.is_under_warranty = bool(rec.warranty_id and rec.warranty_id.state in ('active', 'expiring_soon'))

    @api.depends('is_under_warranty', 'repair_cost', 'labour_cost')
    def _compute_charges(self):
        for rec in self:
            # If covered under active manufacturer/EPC warranty, customer is charged ZERO!
            if rec.is_under_warranty:
                rec.total_charge = 0.0
            else:
                rec.total_charge = round(rec.repair_cost + rec.labour_cost, 2)

    def action_resolve_ticket(self):
        self.ensure_one()
        self.write({'state': 'resolved'})
        if self.replacement_serial_id:
            self.replacement_serial_id.write({
                'status': 'installed',
                'customer_id': self.customer_id.id,
            })
            if self.serial_id:
                self.serial_id.write({'status': 'replaced'})
        self.message_post(body=_("Service ticket marked as resolved. Customer billable charge: ₹%.2f.") % self.total_charge)
        return True

    def action_close_ticket(self):
        self.ensure_one()
        self.write({'state': 'closed'})
        return True
