# -*- coding: utf-8 -*-
from odoo import models, fields

class SunpowerSitePhoto(models.Model):
    _name = 'sunpower.site.photo'
    _description = 'SunPower Field Geotagged Site Photo'
    _order = 'captured_at DESC'

    name = fields.Char(string='Photo Title', default='Field Installation Evidence')
    job_id = fields.Many2one('sunpower.job', string='Installation Job', ondelete='cascade')
    survey_id = fields.Many2one('sunpower.survey', string='Site Survey', ondelete='cascade')

    image = fields.Binary(string='Photo Image', required=True, attachment=True)
    image_filename = fields.Char(string='Filename', default='solar_site_photo.jpg')
    captured_at = fields.Datetime(string='Captured At', default=fields.Datetime.now)

    latitude = fields.Float(string='Geotag Latitude', digits=(10, 7), default=13.0827)
    longitude = fields.Float(string='Geotag Longitude', digits=(10, 7), default=80.2707)

    photo_type = fields.Selection([
        ('before', 'Before: Clean Pre-Install Roof Area'),
        ('during', 'During: Mounting Rails & DC Cabling'),
        ('after', 'After: Commissioned Solar Array & Inverter'),
        ('meter', 'Generation Meter & Earthing Test')
    ], string='Milestone Stage', default='after', required=True)

    caption = fields.Char(string='Notes / Caption')
