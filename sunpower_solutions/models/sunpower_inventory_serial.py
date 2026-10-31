# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import ValidationError

class SunpowerInventorySerial(models.Model):
    _name = 'sunpower.inventory.serial'
    _description = 'SunPower Serialized Hardware Asset (QR/Barcode)'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _rec_name = 'serial_number'
    _order = 'create_date DESC, serial_number ASC'

    product_id = fields.Many2one('sunpower.product', string='Equipment Product', required=True, tracking=True)
    serial_number = fields.Char(string='Serial Number / Barcode', required=True, tracking=True, index=True)
    category = fields.Selection(related='product_id.category', string='Component Category', store=True)

    status = fields.Selection([
        ('in_stock', 'In Warehouse Stock'),
        ('reserved', 'Reserved for Order'),
        ('dispatched', 'Dispatched / In-Transit'),
        ('installed', 'Installed at Customer Site'),
        ('under_warranty', 'Active Warranty Coverage'),
        ('replaced', 'Replaced / RMA Return'),
        ('returned', 'Returned to Warehouse Stock')
    ], string='Asset Lifecycle State', default='in_stock', required=True, tracking=True)

    reserved_order_id = fields.Many2one('sunpower.order', string='Reserved Sales Order', tracking=True)
    current_job_id = fields.Many2one('sunpower.job', string='Assigned Installation Job')
    dispatch_id = fields.Many2one('sunpower.dispatch', string='Dispatch Manifest')
    warranty_id = fields.Many2one('sunpower.warranty', string='Active Warranty Ledger')
    customer_id = fields.Many2one('sunpower.customer', string='Operating Customer', tracking=True)

    installed_at = fields.Datetime(string='Site Commissioning Timestamp')
    notes = fields.Char(string='Batch / Pallet Identifier')

    _sql_constraints = [
        ('unique_serial_product', 'unique(product_id, serial_number)',
         'Serial number must be strictly unique per product model!')
    ]

    @api.constrains('serial_number')
    def _validate_serial_format(self):
        for rec in self:
            if not rec.serial_number or len(rec.serial_number.strip()) < 3:
                raise ValidationError(_("Serial number must be at least 3 alphanumeric characters."))
