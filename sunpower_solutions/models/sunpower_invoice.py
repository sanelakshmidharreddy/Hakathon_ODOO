# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from datetime import timedelta

class SunpowerInvoice(models.Model):
    _name = 'sunpower.invoice'
    _description = 'SunPower Customer Solar Installation Invoice'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'invoice_date DESC, id DESC'

    name = fields.Char(string='Tax Invoice No.', required=True, copy=False, readonly=True, default=lambda self: _('New'))
    order_id = fields.Many2one('sunpower.order', string='Sales Order', required=True, tracking=True)
    customer_id = fields.Many2one('sunpower.customer', string='Billed Customer', required=True, tracking=True)

    invoice_date = fields.Date(string='Invoice Date', default=fields.Date.today, required=True, tracking=True)
    due_date = fields.Date(string='Payment Due Date', default=lambda self: fields.Date.today() + timedelta(days=15), required=True)

    amount_total = fields.Float(string='Invoice Total (₹)', required=True, default=0.0, tracking=True)
    amount_paid = fields.Float(string='Total Received (₹)', compute='_compute_balance', store=True, tracking=True)
    balance_amount = fields.Float(string='Outstanding Balance (₹)', compute='_compute_balance', store=True)

    payment_ids = fields.One2many('sunpower.payment', 'invoice_id', string='Recorded Payments')

    state = fields.Selection([
        ('draft', 'Draft Invoice'),
        ('posted', 'Posted / Issued to Customer'),
        ('paid', 'Fully Paid & Cleared'),
        ('overdue', 'Payment Overdue'),
        ('cancelled', 'Cancelled')
    ], string='Invoice Status', default='draft', required=True, tracking=True)

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('name', _('New')) == _('New'):
                vals['name'] = self.env['ir.sequence'].next_by_code('sunpower.invoice') or _('New')
        return super(SunpowerInvoice, self).create(vals_list)

    @api.depends('payment_ids.amount', 'amount_total')
    def _compute_balance(self):
        for rec in self:
            paid = sum(p.amount for p in rec.payment_ids)
            rec.amount_paid = paid
            rec.balance_amount = max(0.0, rec.amount_total - paid)
            if rec.amount_total > 0 and paid >= rec.amount_total and rec.state not in ('cancelled', 'draft'):
                rec.state = 'paid'

    def action_post(self):
        self.ensure_one()
        self.write({'state': 'posted'})
        self.message_post(body=_("Invoice %s posted for ₹%s.") % (self.name, f"{self.amount_total:,.2f}"))
        return True

    def action_register_payment_quick(self):
        """Quick action to register advance or full payment"""
        self.ensure_one()
        payment_val = self.balance_amount if self.balance_amount > 0 else self.amount_total
        self.env['sunpower.payment'].create({
            'invoice_id': self.id,
            'order_id': self.order_id.id,
            'amount': payment_val,
            'payment_date': fields.Date.today(),
            'payment_mode': 'bank_transfer',
            'reference': 'RTGS/DEMO-' + self.name,
        })
        self.write({'state': 'paid'})
        self.message_post(body=_("Recorded receipt of ₹%s via RTGS/NEFT.") % f"{payment_val:,.2f}")
        return True
