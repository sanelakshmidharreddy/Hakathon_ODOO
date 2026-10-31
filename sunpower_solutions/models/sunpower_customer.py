# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import ValidationError

class SunpowerCustomer(models.Model):
    _name = 'sunpower.customer'
    _description = 'SunPower Solar Customer'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'name ASC'

    name = fields.Char(string='Customer Name', required=True, tracking=True, index=True)
    phone = fields.Char(string='Phone / WhatsApp', required=True, tracking=True, index=True)
    email = fields.Char(string='Email Address', tracking=True)
    street = fields.Char(string='Street Address')
    city = fields.Char(string='City', default='Chennai')
    state_id = fields.Many2one('res.country.state', string='State')
    state_name = fields.Char(string='State Name', default='Tamil Nadu')
    zip = fields.Char(string='PIN Code')
    country_id = fields.Many2one('res.country', string='Country', default=lambda self: self.env.ref('base.in', raise_if_not_found=False))
    
    latitude = fields.Float(string='Latitude', digits=(10, 7))
    longitude = fields.Float(string='Longitude', digits=(10, 7))

    customer_type = fields.Selection([
        ('home', 'Residential Rooftop'),
        ('small_factory', 'Commercial / Small Factory')
    ], string='Customer Type', default='home', required=True, tracking=True)

    sanctioned_load_kw = fields.Float(string='Sanctioned Load (kW)', default=5.0)
    consumer_number = fields.Char(string='DISCOM Consumer No.')

    # Relational Fields
    lead_ids = fields.One2many('sunpower.lead', 'customer_id', string='CRM Leads')
    quote_ids = fields.One2many('sunpower.quote', 'customer_id', string='Quotations')
    order_ids = fields.One2many('sunpower.order', 'customer_id', string='Sales Orders')
    job_ids = fields.One2many('sunpower.job', 'customer_id', string='Installation Jobs')
    ticket_ids = fields.One2many('sunpower.service.ticket', 'customer_id', string='Service Tickets')
    warranty_ids = fields.One2many('sunpower.warranty', 'customer_id', string='Active Warranties')

    # Counters for Smart Buttons
    lead_count = fields.Integer(string='Leads Count', compute='_compute_counts')
    quote_count = fields.Integer(string='Quotes Count', compute='_compute_counts')
    order_count = fields.Integer(string='Orders Count', compute='_compute_counts')
    job_count = fields.Integer(string='Jobs Count', compute='_compute_counts')
    ticket_count = fields.Integer(string='Tickets Count', compute='_compute_counts')
    warranty_count = fields.Integer(string='Warranties Count', compute='_compute_counts')

    @api.depends('lead_ids', 'quote_ids', 'order_ids', 'job_ids', 'ticket_ids', 'warranty_ids')
    def _compute_counts(self):
        for rec in self:
            rec.lead_count = len(rec.lead_ids)
            rec.quote_count = len(rec.quote_ids)
            rec.order_count = len(rec.order_ids)
            rec.job_count = len(rec.job_ids)
            rec.ticket_count = len(rec.ticket_ids)
            rec.warranty_count = len(rec.warranty_ids)

    @api.constrains('phone')
    def _check_phone(self):
        for rec in self:
            if rec.phone and len(rec.phone.strip()) < 7:
                raise ValidationError(_("Please provide a valid phone number (at least 7 digits)."))

    def action_view_leads(self):
        self.ensure_one()
        return {
            'name': _('Customer Leads'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.lead',
            'view_mode': 'kanban,tree,form',
            'domain': [('customer_id', '=', self.id)],
            'context': {'default_customer_id': self.id},
        }

    def action_view_orders(self):
        self.ensure_one()
        return {
            'name': _('Sales Orders'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.order',
            'view_mode': 'tree,form',
            'domain': [('customer_id', '=', self.id)],
            'context': {'default_customer_id': self.id},
        }

    def action_view_jobs(self):
        self.ensure_one()
        return {
            'name': _('Installation Jobs'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.job',
            'view_mode': 'tree,form,calendar',
            'domain': [('customer_id', '=', self.id)],
            'context': {'default_customer_id': self.id},
        }

    def action_view_warranties(self):
        self.ensure_one()
        return {
            'name': _('Warranties'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.warranty',
            'view_mode': 'tree,form',
            'domain': [('customer_id', '=', self.id)],
            'context': {'default_customer_id': self.id},
        }
