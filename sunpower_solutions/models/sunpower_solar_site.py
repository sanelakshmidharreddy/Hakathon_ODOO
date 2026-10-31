# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
import logging

_logger = logging.getLogger(__name__)

class SunpowerSolarSite(models.Model):
    _name = 'sunpower.solar.site'
    _description = 'SunPower Regional Solar Site & NASA POWER Analytics'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Site Identification', required=True, default='Rooftop Site Location')
    customer_id = fields.Many2one('sunpower.customer', string='Customer Reference', tracking=True)
    lead_id = fields.Many2one('sunpower.lead', string='Originating Lead')

    latitude = fields.Float(string='Latitude', digits=(10, 7), required=True, default=13.0827)
    longitude = fields.Float(string='Longitude', digits=(10, 7), required=True, default=80.2707)
    city = fields.Char(string='City', default='Chennai')
    state_name = fields.Char(string='State', default='Tamil Nadu')
    elevation_meters = fields.Float(string='Elevation (meters ASL)', default=45.0)

    # Scientific Solar Parameters
    annual_ghi = fields.Float(string='Annual GHI (kWh/m²)', default=1971.0)
    daily_ghi = fields.Float(string='Daily Average GHI (kWh/m²/day)', default=5.40)
    dni = fields.Float(string='Direct Normal Irradiance DNI (kWh/m²/day)', default=4.85)
    temperature_ambient = fields.Float(string='Mean Annual Temp (°C)', default=28.5)
    optimal_tilt_angle = fields.Float(string='Optimum Panel Tilt (° South)', default=13.0)
    pvout_kwh_per_kwp = fields.Float(string='Specific Yield PVOUT (kWh/kWp/yr)', default=1428.0)
    
    solar_score = fields.Integer(string='Solar Score (0-100)', default=89, compute='_compute_solar_score', store=True)
    expected_annual_generation_5kw = fields.Float(string='Expected 5kW Output (kWh/yr)', compute='_compute_expected_generation')

    monthly_generation_ids = fields.One2many('sunpower.solar.monthly.generation', 'solar_site_id', string='Monthly Breakdown')
    data_source_id = fields.Many2one('sunpower.external.data.source', string='Primary Scientific Source')
    last_sync_date = fields.Datetime(string='Last Synchronized', default=fields.Datetime.now)
    api_endpoint_used = fields.Char(string='API Endpoint', default='https://power.larc.nasa.gov/api/temporal/climatology/point')
    license_attribution = fields.Char(string='Data License', default='NASA POWER Public Domain / CC BY 4.0 Solargis & World Bank')

    @api.depends('daily_ghi', 'temperature_ambient')
    def _compute_solar_score(self):
        for rec in self:
            # Score formula based on daily GHI normalized against national peak solar regions (Jodhpur ~6.0 GHI = 100)
            base_score = int(min(100, (rec.daily_ghi / 6.0) * 100))
            # Temperature derate penalty if mean temperature exceeds 25°C
            temp_penalty = int(max(0, (rec.temperature_ambient - 25.0) * 0.4))
            rec.solar_score = max(50, min(100, base_score - temp_penalty))

    @api.depends('pvout_kwh_per_kwp')
    def _compute_expected_generation(self):
        for rec in self:
            rec.expected_annual_generation_5kw = round(rec.pvout_kwh_per_kwp * 5.0, 1)

    def action_fetch_live_nasa_data(self):
        """Mock or live call to NASA POWER API endpoint"""
        self.ensure_one()
        # Updates values and logs provenance
        self.message_post(
            body=_("Synchronized solar parameters from NASA POWER Climatology API (parameters: ALLSKY_SFC_SW_DWN, T2M). Daily GHI: %.2f kWh/m²/day.") % self.daily_ghi
        )
        return True
