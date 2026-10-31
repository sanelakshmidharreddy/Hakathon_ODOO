# -*- coding: utf-8 -*-
import json
import logging
import requests
from odoo import http
from odoo.http import request

_logger = logging.getLogger(__name__)


class SunPowerGeocodingController(http.Controller):

    @http.route('/api/solar/geocode', type='http', auth='public', methods=['GET'], csrf=False)
    def geocode_address(self, q=None, **kwargs):
        """Geocode an address string using OpenStreetMap Nominatim."""
        if not q:
            return request.make_response(
                json.dumps({"error": "Query string 'q' required"}),
                headers=[('Content-Type', 'application/json')],
                status=400
            )

        url = f"https://nominatim.openstreetmap.org/search?format=json&q={requests.utils.quote(q)}&countrycodes=in&limit=1"
        headers = {'User-Agent': 'SunPower-Solutions-Odoo/1.0 (contact@sunpowersolutions.internal)'}

        try:
            resp = requests.get(url, headers=headers, timeout=5)
            if resp.status_code == 200:
                results = resp.json()
                if results:
                    best = results[0]
                    return request.make_response(
                        json.dumps({
                            "display_name": best.get("display_name"),
                            "latitude": float(best.get("lat")),
                            "longitude": float(best.get("lon")),
                            "source": "OpenStreetMap Nominatim (ODbL)",
                        }),
                        headers=[('Content-Type', 'application/json')]
                    )
        except Exception as e:
            _logger.warning("Geocoding failed: %s", str(e))

        return request.make_response(
            json.dumps({"error": "Location not found or geocoding service unavailable"}),
            headers=[('Content-Type', 'application/json')],
            status=404
        )
