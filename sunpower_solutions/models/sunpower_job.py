# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import UserError

class SunpowerJob(models.Model):
    _name = 'sunpower.job'
    _description = 'SunPower Field Installation Job (Technician PWA)'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'scheduled_date DESC, id DESC'

    name = fields.Char(string='Job Reference', required=True, copy=False, readonly=True, default=lambda self: _('New'))
    order_id = fields.Many2one('sunpower.order', string='Sales Order', required=True, tracking=True)
    customer_id = fields.Many2one('sunpower.customer', string='Customer', related='order_id.customer_id', store=True)

    technician_ids = fields.Many2many('res.users', 'sunpower_job_res_users_rel', 'job_id', 'user_id', string='Installation Crew', tracking=True)
    lead_technician_id = fields.Many2one('res.users', string='Lead Electrician', default=lambda self: self.env.user)

    scheduled_date = fields.Date(string='Scheduled Installation Date', default=fields.Date.today, required=True, tracking=True)
    start_time = fields.Datetime(string='Work Started At')
    end_time = fields.Datetime(string='Work Completed At')

    installed_capacity = fields.Float(string='Installed Capacity (kW)', default=5.0, required=True)
    state = fields.Selection([
        ('assigned', 'Assigned to Crew'),
        ('in_progress', 'Installation In-Progress'),
        ('completed', 'Commissioned & Customer Sign-off'),
        ('verified', 'Engineering Verified & Handed Over'),
        ('cancelled', 'Cancelled')
    ], string='Job State', default='assigned', required=True, tracking=True)

    photo_ids = fields.One2many('sunpower.site.photo', 'job_id', string='Geotagged Photo Evidence')
    signature_id = fields.Many2one('sunpower.signature', string='Digital Signature On Glass')

    test_result = fields.Selection([
        ('pass', 'Passed: Earth Resistance < 5Ω & Polarity OK'),
        ('conditional', 'Passed: Minor Cable Dressing Required'),
        ('fail', 'Failed: Inverter Grid Isolation Error')
    ], string='Pre-Commissioning Test Result', default='pass', required=True)

    generation_meter_reading = fields.Float(string='Initial Meter Reading (kWh)', default=12.4)
    completion_notes = fields.Text(string='Commissioning Notes')

    photo_count = fields.Integer(string='Photos Count', compute='_compute_photo_count')

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('name', _('New')) == _('New'):
                vals['name'] = self.env['ir.sequence'].next_by_code('sunpower.job') or _('New')
        return super(SunpowerJob, self).create(vals_list)

    @api.depends('photo_ids')
    def _compute_photo_count(self):
        for rec in self:
            rec.photo_count = len(rec.photo_ids)

    def action_start_work(self):
        self.ensure_one()
        self.write({
            'state': 'in_progress',
            'start_time': fields.Datetime.now()
        })
        self.message_post(body=_("Technician crew started rooftop installation on site."))
        return True

    def action_complete_work(self):
        self.ensure_one()
        if not self.photo_ids:
            raise UserError(_("Compliance Gate: You must capture at least one geotagged completion photo."))
        
        self.write({
            'state': 'completed',
            'end_time': fields.Datetime.now()
        })
        self.order_id.write({'state': 'installed'})

        # Mark installed status on customer serials
        for warr in self.order_id.warranty_ids:
            warr.write({'job_id': self.id})
            if warr.serial_id:
                warr.serial_id.write({
                    'status': 'installed',
                    'installed_at': fields.Datetime.now(),
                    'current_job_id': self.id,
                })

        self.message_post(body=_(
            "Installation successfully commissioned! Meter tested at %.1f kWh. Certificate ready for printing."
        ) % self.generation_meter_reading)
        return True
