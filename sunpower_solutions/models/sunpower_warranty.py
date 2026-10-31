# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from datetime import timedelta

class SunpowerWarranty(models.Model):
    _name = 'sunpower.warranty'
    _description = 'SunPower Digital Warranty Ledger'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'end_date ASC, id DESC'

    name = fields.Char(string='Warranty Certificate ID', required=True, copy=False, readonly=True, default=lambda self: _('New'))
    serial_id = fields.Many2one('sunpower.inventory.serial', string='Hardware Serial Number', required=True, tracking=True)
    serial_number_str = fields.Char(related='serial_id.serial_number', string='Barcode / Serial', store=True)
    product_id = fields.Many2one('sunpower.product', string='Covered Product', required=True, tracking=True)
    customer_id = fields.Many2one('sunpower.customer', string='Owner / Customer', required=True, tracking=True)

    order_id = fields.Many2one('sunpower.order', string='Sales Order')
    dispatch_id = fields.Many2one('sunpower.dispatch', string='Dispatch Manifest')
    job_id = fields.Many2one('sunpower.job', string='Commissioning Job')

    start_date = fields.Date(string='Warranty Start Date', required=True, default=fields.Date.today, tracking=True)
    end_date = fields.Date(string='Warranty Expiry Date', required=True, tracking=True)
    warranty_years = fields.Integer(string='Coverage Period (Years)', default=2)

    days_remaining = fields.Integer(string='Days Remaining', compute='_compute_days_remaining')
    
    state = fields.Selection([
        ('active', 'Active Coverage'),
        ('expiring_soon', 'Expiring Soon (< 60 Days)'),
        ('expired', 'Warranty Expired')
    ], string='Warranty Status', default='active', required=True, tracking=True)

    ticket_ids = fields.One2many('sunpower.service.ticket', 'warranty_id', string='Service Claims')

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('name', _('New')) == _('New'):
                vals['name'] = self.env['ir.sequence'].next_by_code('sunpower.warranty') or _('New')
        return super(SunpowerWarranty, self).create(vals_list)

    @api.depends('end_date')
    def _compute_days_remaining(self):
        today = fields.Date.today()
        for rec in self:
            if rec.end_date:
                delta = (rec.end_date - today).days
                rec.days_remaining = delta
            else:
                rec.days_remaining = 0

    @api.model
    def cron_update_warranty_statuses(self):
        """Nightly cron to update status for active, expiring_soon, and expired warranties"""
        today = fields.Date.today()
        sixty_days = today + timedelta(days=60)

        # Expired
        expired = self.search([('end_date', '<', today), ('state', '!=', 'expired')])
        expired.write({'state': 'expired'})

        # Expiring Soon
        expiring = self.search([
            ('end_date', '>=', today),
            ('end_date', '<=', sixty_days),
            ('state', '=', 'active')
        ])
        expiring.write({'state': 'expiring_soon'})
