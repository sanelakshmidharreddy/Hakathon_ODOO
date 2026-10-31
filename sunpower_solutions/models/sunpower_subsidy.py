# -*- coding: utf-8 -*-
from odoo import models, fields

class SunpowerSubsidy(models.Model):
    _name = 'sunpower.subsidy'
    _description = 'Government Rooftop Solar Subsidy Tracker (PM Surya Ghar / MNRE)'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'create_date DESC'

    name = fields.Char(string='Subsidy Application Ref', default='PM-SURYA-GHAR-APP')
    order_id = fields.Many2one('sunpower.order', string='Sales Order', required=True, tracking=True)
    customer_id = fields.Many2one('sunpower.customer', string='Applicant Customer', related='order_id.customer_id', store=True)

    scheme_name = fields.Char(string='Central / State Subsidy Scheme', default='PM Surya Ghar Muft Bijli Yojana (MNRE)', required=True)
    discom_name = fields.Char(string='DISCOM / Electricity Board', default='TANGEDCO (Tamil Nadu)')
    consumer_number = fields.Char(string='Electricity Consumer ID')

    applied_date = fields.Date(string='National Portal Application Date', default=fields.Date.today)
    approval_date = fields.Date(string='Technical Feasibility Approved')
    received_date = fields.Date(string='DBT Direct Benefit Credited Date')

    subsidy_amount = fields.Float(string='Direct Benefit Subsidy Amount (₹)', default=78000.0, required=True, tracking=True)

    state = fields.Selection([
        ('not_applied', 'Application Pending'),
        ('applied', 'Applied on National Solar Portal'),
        ('approved', 'Technical Feasibility Approved by DISCOM'),
        ('rejected', 'Application Rejected / Queries Raised'),
        ('received', 'DBT Subsidy Credited to Customer Bank')
    ], string='Subsidy Status', default='applied', required=True, tracking=True)
