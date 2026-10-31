# -*- coding: utf-8 -*-
from odoo import models, fields, api, _

class SunpowerSurvey(models.Model):
    _name = 'sunpower.survey'
    _description = 'SunPower Technical Site Survey'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'create_date DESC'

    name = fields.Char(string='Survey Reference', required=True, copy=False, readonly=True, default=lambda self: _('New'))
    lead_id = fields.Many2one('sunpower.lead', string='CRM Lead', required=True, tracking=True)
    customer_id = fields.Many2one('sunpower.customer', string='Customer Profile', related='lead_id.customer_id', store=True)
    technician_id = fields.Many2one('res.users', string='Surveying Technician', default=lambda self: self.env.user, required=True, tracking=True)

    roof_direction = fields.Selection([
        ('south', 'South Facing (Optimal for India)'),
        ('south_west', 'South-West'),
        ('south_east', 'South-East'),
        ('east', 'East Facing'),
        ('west', 'West Facing'),
        ('north', 'North Facing (Shadow Penalty)')
    ], string='Roof Azimuth / Orientation', default='south', required=True, tracking=True)

    roof_tilt = fields.Float(string='Roof Tilt Angle (°)', default=14.0, tracking=True)
    shadow_free_area = fields.Float(string='Shadow-Free Area (Sq Ft)', default=550.0, required=True, tracking=True)
    cable_distance = fields.Float(string='DC Cable Distance to Inverter (Meters)', default=20.0, required=True)
    
    roof_type = fields.Selection([
        ('concrete_flat', 'RCC Concrete Flat Roof (Standard Ballasted)'),
        ('metal_sheet', 'Industrial Trapezoidal Metal Sheet'),
        ('clay_tiles', 'Sloped Mangalore Clay Tiles'),
        ('ground_mount', 'Ground Mounted Array')
    ], string='Roof Construction', default='concrete_flat', required=True)

    grid_connection = fields.Selection([
        ('single_phase', 'Single Phase 230V (Up to 5kW)'),
        ('three_phase', 'Three Phase 415V (> 5kW)'),
        ('no_grid', 'Off-Grid Remote (No Grid Supply)')
    ], string='Discom Connection Phase', default='single_phase', required=True)

    latitude = fields.Float(string='GPS Survey Lat', digits=(10, 7), related='lead_id.latitude', readonly=False)
    longitude = fields.Float(string='GPS Survey Lng', digits=(10, 7), related='lead_id.longitude', readonly=False)

    recommended_capacity = fields.Float(string='Engineer Recommended Capacity (kW)', default=5.0, required=True, tracking=True)
    state = fields.Selection([
        ('draft', 'Draft / In-Progress'),
        ('completed', 'Completed by Technician'),
        ('approved', 'Approved by Engineering Lead'),
        ('rejected', 'Rejected / Re-survey Required')
    ], string='Survey Status', default='draft', required=True, tracking=True)

    notes = fields.Text(string='Engineering Observations & Shadows')
    photo_ids = fields.One2many('sunpower.site.photo', 'survey_id', string='Survey Site Photos')

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('name', _('New')) == _('New'):
                vals['name'] = self.env['ir.sequence'].next_by_code('sunpower.survey') or _('New')
        return super(SunpowerSurvey, self).create(vals_list)

    def action_complete_survey(self):
        self.ensure_one()
        self.write({'state': 'completed'})
        if self.lead_id.status in ('new', 'contacted', 'survey_scheduled'):
            self.lead_id.write({'status': 'survey_completed'})
        return True

    def action_approve(self):
        self.ensure_one()
        self.write({'state': 'approved'})
        self.lead_id.write({'status': 'qualified'})
        self.message_post(body=_("Site survey approved by %s. Quote generation gate is now open.") % self.env.user.name)
        return True

    def action_reject(self):
        self.ensure_one()
        self.write({'state': 'rejected'})
        self.message_post(body=_("Survey rejected. Revision or additional photos required."))
        return True
