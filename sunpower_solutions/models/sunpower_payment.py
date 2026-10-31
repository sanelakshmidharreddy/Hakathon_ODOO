# -*- coding: utf-8 -*-
from odoo import models, fields

class SunpowerPayment(models.Model):
    _name = 'sunpower.payment'
    _description = 'SunPower Customer Payment Record'
    _order = 'payment_date DESC, id DESC'

    invoice_id = fields.Many2one('sunpower.invoice', string='Invoice Reference', ondelete='cascade')
    order_id = fields.Many2one('sunpower.order', string='Sales Order Reference')
    customer_id = fields.Many2one('sunpower.customer', string='Payer Customer', related='invoice_id.customer_id', store=True)

    amount = fields.Float(string='Payment Amount (₹)', required=True, default=0.0)
    payment_date = fields.Date(string='Transaction Date', default=fields.Date.today, required=True)
    
    payment_mode = fields.Selection([
        ('bank_transfer', 'NEFT / RTGS / IMPS Bank Transfer'),
        ('upi', 'UPI / QR Payment'),
        ('cheque', 'Demand Draft / Cheque'),
        ('cash', 'Cash Receipt')
    ], string='Payment Mode', default='bank_transfer', required=True)

    reference = fields.Char(string='Bank UTR / Transaction Ref No.')
    notes = fields.Char(string='Remark')
