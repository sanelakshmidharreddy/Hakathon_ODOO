# -*- coding: utf-8 -*-
from odoo import models, fields, api, _

class SunpowerProduct(models.Model):
    _name = 'sunpower.product'
    _description = 'SunPower Solar Product & Component'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'category, name ASC'

    name = fields.Char(string='Product Name', required=True, tracking=True, index=True)
    default_code = fields.Char(string='SKU / Part Code', required=True, tracking=True, index=True)
    
    category = fields.Selection([
        ('panel', 'Solar PV Panel'),
        ('inverter', 'Solar Inverter'),
        ('battery', 'Storage Battery (LiFePO4)'),
        ('charge_controller', 'MPPT Charge Controller'),
        ('mounting', 'Mounting Structure (Aluminium)'),
        ('wiring', 'DC/AC Cabling & Conduits'),
        ('safety', 'Safety, Earthing & Lightning Kit'),
        ('service', 'Engineering & Installation Service')
    ], string='Component Category', required=True, tracking=True, default='panel')

    brand = fields.Char(string='Brand / OEM', default='SunPower')
    model_name = fields.Char(string='Model / Series')
    description = fields.Text(string='Technical Specifications')

    cost_price = fields.Float(string='Cost Price (₹)', required=True, default=0.0, tracking=True)
    sale_price = fields.Float(string='Selling Price (₹)', required=True, default=0.0, tracking=True)
    
    warranty_years = fields.Integer(string='Standard Warranty (Years)', default=2, tracking=True)
    track_serial = fields.Boolean(string='Track Individual Serial Numbers (QR/Barcode)', default=False)

    stock_quantity = fields.Float(string='Stock on Hand', compute='_compute_stock_quantity', store=True)
    min_stock_level = fields.Float(string='Reorder Alert Level', default=5.0)
    is_low_stock = fields.Boolean(string='Low Stock Alert', compute='_compute_low_stock')
    unit_of_measure = fields.Char(string='Unit', default='Piece')

    serial_ids = fields.One2many('sunpower.inventory.serial', 'product_id', string='Registered Serials')
    serial_count = fields.Integer(string='Serial Numbers Count', compute='_compute_serial_count')

    @api.depends('serial_ids', 'serial_ids.status', 'track_serial')
    def _compute_stock_quantity(self):
        for rec in self:
            if rec.track_serial:
                rec.stock_quantity = len(rec.serial_ids.filtered(lambda s: s.status == 'in_stock'))
            else:
                # Default pool stock for non-serialized products (hardware, cable sets)
                rec.stock_quantity = 50.0

    @api.depends('stock_quantity', 'min_stock_level')
    def _compute_low_stock(self):
        for rec in self:
            rec.is_low_stock = rec.stock_quantity <= rec.min_stock_level

    @api.depends('serial_ids')
    def _compute_serial_count(self):
        for rec in self:
            rec.serial_count = len(rec.serial_ids)

    def action_view_serials(self):
        self.ensure_one()
        return {
            'name': _('Serials: %s') % self.name,
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.inventory.serial',
            'view_mode': 'tree,form',
            'domain': [('product_id', '=', self.id)],
            'context': {'default_product_id': self.id},
        }
