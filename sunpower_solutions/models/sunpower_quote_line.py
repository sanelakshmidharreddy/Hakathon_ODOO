# -*- coding: utf-8 -*-
from odoo import models, fields, api

class SunpowerQuoteLine(models.Model):
    _name = 'sunpower.quote.line'
    _description = 'SunPower Quotation BOM Line'
    _order = 'id ASC'

    quote_id = fields.Many2one('sunpower.quote', string='Quotation Reference', required=True, ondelete='cascade')
    product_id = fields.Many2one('sunpower.product', string='Component / Product', required=True)
    name = fields.Char(string='Description', required=True)
    category = fields.Selection(related='product_id.category', string='Category', readonly=True)

    quantity = fields.Float(string='Quantity', default=1.0, required=True)
    unit_price = fields.Float(string='Unit Price (₹)', required=True, default=0.0)
    cost_price = fields.Float(string='Unit Cost (₹)', default=0.0)

    subtotal = fields.Float(string='Subtotal (₹)', compute='_compute_totals', store=True)
    subtotal_cost = fields.Float(string='Total Cost (₹)', compute='_compute_totals', store=True)
    required_component = fields.Boolean(string='Required Component', default=True)

    @api.onchange('product_id')
    def _onchange_product_id(self):
        if self.product_id:
            self.name = self.product_id.name
            self.unit_price = self.product_id.sale_price
            self.cost_price = self.product_id.cost_price

    @api.depends('quantity', 'unit_price', 'cost_price')
    def _compute_totals(self):
        for line in self:
            line.subtotal = round(line.quantity * line.unit_price, 2)
            line.subtotal_cost = round(line.quantity * line.cost_price, 2)
