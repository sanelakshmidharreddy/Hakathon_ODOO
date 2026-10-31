# -*- coding: utf-8 -*-
from odoo import models, fields

class SunpowerExternalDataSource(models.Model):
    _name = 'sunpower.external.data.source'
    _description = 'SunPower External Scientific Data Source'
    _order = 'name ASC'

    name = fields.Char(string='Portal / Source Name', required=True)
    portal_url = fields.Char(string='Public Portal URL', required=True)
    endpoint_url = fields.Char(string='API / Endpoint URL')
    access_date = fields.Date(string='Last Verification Date', default=fields.Date.today)
    license = fields.Char(string='License & Attribution Term', default='Public Domain / Open Data')
    coverage = fields.Char(string='Geographical Coverage', default='India & Global Satellite')
    format = fields.Selection([
        ('json', 'JSON Web API'),
        ('rest', 'RESTful API'),
        ('geojson', 'GeoJSON / GIS Layer'),
        ('csv', 'Open Data CSV/XLSX')
    ], string='Data Format', default='json')
    api_key_required = fields.Boolean(string='Requires API Key', default=False)
    notes = fields.Text(string='Parameters & Methodology Notes')


class SunpowerSolarMonthlyGeneration(models.Model):
    _name = 'sunpower.solar.monthly.generation'
    _description = 'Monthly Solar Generation Breakdown'
    _order = 'month_num ASC'

    solar_site_id = fields.Many2one('sunpower.solar.site', string='Solar Site', ondelete='cascade')
    month_name = fields.Char(string='Month', required=True)
    month_num = fields.Integer(string='Month Number', required=True)
    daily_ghi = fields.Float(string='Daily GHI (kWh/m²/day)')
    temperature_c = fields.Float(string='Ambient Temp (°C)')
    estimated_output_kwh = fields.Float(string='Simulated 5kW Generation (kWh)')
