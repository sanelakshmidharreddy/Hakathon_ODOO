# -*- coding: utf-8 -*-
from odoo import models, fields, api, _

class SunpowerQuoteWizard(models.TransientModel):
    _name = 'sunpower.quote.wizard'
    _description = 'Quick Solar Quote Generator Wizard'

    lead_id = fields.Many2one('sunpower.lead', string='CRM Lead', required=True)
    customer_id = fields.Many2one('sunpower.customer', string='Customer', related='lead_id.customer_id')

    system_type = fields.Selection([
        ('on_grid', 'On-Grid System (Net-Metered)'),
        ('off_grid', 'Off-Grid System (Battery Storage)'),
        ('hybrid', 'Hybrid Solar System')
    ], string='System Type', default='off_grid', required=True)

    capacity = fields.Float(string='Target Capacity (kW)', default=5.0, required=True)
    discount_amount = fields.Float(string='Promotional Discount (₹)', default=0.0)

    def action_generate_quote(self):
        self.ensure_one()
        quote = self.env['sunpower.quote'].create({
            'lead_id': self.lead_id.id,
            'customer_id': self.customer_id.id,
            'system_type': self.system_type,
            'capacity': self.capacity,
            'discount_amount': self.discount_amount,
        })
        quote.action_generate_bom()
        return {
            'name': _('Generated Solar Quotation'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.quote',
            'res_id': quote.id,
            'view_mode': 'form',
            'target': 'current',
        }
