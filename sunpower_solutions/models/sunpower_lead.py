# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import ValidationError, UserError

class SunpowerLead(models.Model):
    _name = 'sunpower.lead'
    _description = 'SunPower Solar CRM Lead'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'create_date DESC, id DESC'

    name = fields.Char(string='Lead Code', required=True, copy=False, readonly=True, default=lambda self: _('New'))
    customer_id = fields.Many2one('sunpower.customer', string='Customer Profile', tracking=True)
    customer_name = fields.Char(string='Customer Name', required=True, tracking=True)
    phone = fields.Char(string='Phone / WhatsApp', required=True, tracking=True, index=True)
    email = fields.Char(string='Email Address', tracking=True)
    address = fields.Text(string='Installation Site Address')
    city = fields.Char(string='City', default='Chennai')
    state_name = fields.Char(string='State', default='Tamil Nadu')
    latitude = fields.Float(string='Latitude', digits=(10, 7), default=13.0827)
    longitude = fields.Float(string='Longitude', digits=(10, 7), default=80.2707)

    source = fields.Selection([
        ('web_form', 'Web Enquiry Form'),
        ('whatsapp', 'WhatsApp Bot / Direct Chat'),
        ('phone_call', 'Direct Phone Call'),
        ('referral', 'Customer Referral')
    ], string='Lead Source', default='web_form', required=True, tracking=True)

    system_type = fields.Selection([
        ('on_grid', 'On-Grid System (Net-Metered)'),
        ('off_grid', 'Off-Grid System (Battery Storage)'),
        ('hybrid', 'Hybrid Solar System')
    ], string='Desired System Type', default='off_grid', required=True, tracking=True)

    requested_capacity = fields.Float(string='Requested Capacity (kW)', default=5.0, required=True, tracking=True)
    monthly_bill = fields.Float(string='Monthly Electricity Bill (₹)', default=6500.0)
    roof_area = fields.Float(string='Shadow-Free Roof Area (Sq Ft)', default=500.0)

    status = fields.Selection([
        ('new', 'New Enquiry'),
        ('contacted', 'Contacted / Pitch Sent'),
        ('survey_scheduled', 'Survey Scheduled'),
        ('survey_completed', 'Survey Completed'),
        ('qualified', 'Qualified & Sized'),
        ('lost', 'Lost to Competitor'),
        ('converted', 'Converted to Order')
    ], string='Pipeline Status', default='new', required=True, tracking=True, group_expand='_read_group_status')

    assigned_salesperson_id = fields.Many2one(
        'res.users', string='Assigned Sales Rep',
        default=lambda self: self.env.user,
        tracking=True
    )

    solar_score = fields.Integer(string='NASA Solar Irradiance Score', compute='_compute_solar_metrics', store=True)
    expected_annual_generation = fields.Float(string='Projected Output (kWh/Year)', compute='_compute_solar_metrics', store=True)

    survey_ids = fields.One2many('sunpower.survey', 'lead_id', string='Site Surveys')
    quote_ids = fields.One2many('sunpower.quote', 'lead_id', string='Quotations')
    order_ids = fields.One2many('sunpower.order', 'lead_id', string='Confirmed Orders')

    survey_count = fields.Integer(string='Surveys Count', compute='_compute_relational_counts')
    quote_count = fields.Integer(string='Quotes Count', compute='_compute_relational_counts')
    order_count = fields.Integer(string='Orders Count', compute='_compute_relational_counts')

    has_approved_survey = fields.Boolean(string='Has Approved Survey', compute='_compute_survey_approved')

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('name', _('New')) == _('New'):
                vals['name'] = self.env['ir.sequence'].next_by_code('sunpower.lead') or _('New')
            
            # Auto-create or link customer
            if not vals.get('customer_id') and vals.get('customer_name') and vals.get('phone'):
                existing_customer = self.env['sunpower.customer'].search([('phone', '=', vals['phone'])], limit=1)
                if existing_customer:
                    vals['customer_id'] = existing_customer.id
                else:
                    new_cust = self.env['sunpower.customer'].create({
                        'name': vals['customer_name'],
                        'phone': vals['phone'],
                        'email': vals.get('email', ''),
                        'street': vals.get('address', ''),
                        'city': vals.get('city', 'Chennai'),
                        'state_name': vals.get('state_name', 'Tamil Nadu'),
                        'latitude': vals.get('latitude', 13.0827),
                        'longitude': vals.get('longitude', 80.2707),
                    })
                    vals['customer_id'] = new_cust.id
        return super(SunpowerLead, self).create(vals_list)

    @api.constrains('phone', 'status')
    def _check_duplicate_phone(self):
        for rec in self:
            if rec.status not in ('lost', 'converted'):
                normalized_phone = "".join(filter(str.isdigit, rec.phone or ""))
                if len(normalized_phone) > 6:
                    duplicates = self.search([
                        ('id', '!=', rec.id),
                        ('status', 'not in', ('lost', 'converted')),
                    ]).filtered(lambda l: "".join(filter(str.isdigit, l.phone or "")) == normalized_phone)
                    if duplicates:
                        raise ValidationError(_("An active lead already exists with phone number %s (%s - %s).") % (
                            rec.phone, duplicates[0].name, duplicates[0].customer_name
                        ))

    @api.depends('requested_capacity', 'city', 'state_name')
    def _compute_solar_metrics(self):
        for rec in self:
            is_arid = 'jodhpur' in (rec.city or '').lower() or 'rajasthan' in (rec.state_name or '').lower()
            rec.solar_score = 96 if is_arid else 89
            # Approx 1,428 kWh per kW capacity annually
            rec.expected_annual_generation = round(rec.requested_capacity * (1560.0 if is_arid else 1428.0), 1)

    @api.depends('survey_ids', 'quote_ids', 'order_ids')
    def _compute_relational_counts(self):
        for rec in self:
            rec.survey_count = len(rec.survey_ids)
            rec.quote_count = len(rec.quote_ids)
            rec.order_count = len(rec.order_ids)

    @api.depends('survey_ids.state')
    def _compute_survey_approved(self):
        for rec in self:
            rec.has_approved_survey = any(s.state == 'approved' for s in rec.survey_ids)

    @api.model
    def _read_group_status(self, stages, domain, order):
        return [
            'new', 'contacted', 'survey_scheduled', 'survey_completed',
            'qualified', 'lost', 'converted'
        ]

    def action_schedule_survey(self):
        self.ensure_one()
        self.write({'status': 'survey_scheduled'})
        return {
            'name': _('Schedule Site Survey'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.survey',
            'view_mode': 'form',
            'context': {
                'default_lead_id': self.id,
                'default_customer_id': self.customer_id.id,
                'default_roof_type': 'concrete_flat',
            },
            'target': 'current',
        }

    def action_create_quote(self):
        self.ensure_one()
        # Enforce business rule: Quote can only be created after survey state = approved
        if not self.has_approved_survey:
            raise UserError(_(
                "Survey Approval Gate: A quote can only be generated after an engineering site survey "
                "has been signed off and approved by the lead technician."
            ))
        
        survey = self.survey_ids.filtered(lambda s: s.state == 'approved')[:1]
        capacity = survey.recommended_capacity if survey else self.requested_capacity
        sys_type = self.system_type

        return {
            'name': _('Generate Solar Quote'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.quote',
            'view_mode': 'form',
            'context': {
                'default_lead_id': self.id,
                'default_customer_id': self.customer_id.id,
                'default_survey_id': survey.id if survey else False,
                'default_capacity': capacity,
                'default_system_type': sys_type,
            },
            'target': 'current',
        }

    def action_view_surveys(self):
        self.ensure_one()
        return {
            'name': _('Site Surveys'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.survey',
            'view_mode': 'tree,form',
            'domain': [('lead_id', '=', self.id)],
            'context': {'default_lead_id': self.id},
        }

    def action_view_quotes(self):
        self.ensure_one()
        return {
            'name': _('Quotations'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.quote',
            'view_mode': 'tree,form',
            'domain': [('lead_id', '=', self.id)],
            'context': {'default_lead_id': self.id},
        }
