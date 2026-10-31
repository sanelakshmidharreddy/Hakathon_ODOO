# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class SunPowerMainController(http.Controller):

    @http.route('/sunpower/health', type='http', auth='public', methods=['GET'], csrf=False)
    def health_check(self, **kwargs):
        """Health check endpoint for container uptime monitoring."""
        return request.make_response(
            '{"status": "ok", "app": "SunPower Solutions", "version": "1.0.0", "stack": "Odoo Native"}',
            headers=[('Content-Type', 'application/json')]
        )

    @http.route('/sunpower/portal/warranty/<string:serial_number>', type='http', auth='public', website=True)
    def public_warranty_verify(self, serial_number, **kwargs):
        """Public QR code warranty verification endpoint for consumers and auditors."""
        warranty = request.env['sunpower.warranty'].sudo().search([('serial_id.serial_number', '=', serial_number)], limit=1)
        if not warranty:
            return request.make_response(
                f'<html><body style="font-family:sans-serif;padding:40px;text-align:center;">'
                f'<h2 style="color:#d9534f;">Asset Not Found</h2>'
                f'<p>No registered warranty records found for serial <strong>{serial_number}</strong>.</p>'
                f'</body></html>',
                headers=[('Content-Type', 'text/html')]
            )

        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>SunPower Verified Asset Warranty</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; padding: 20px; }}
                .card {{ max-width: 550px; margin: 30px auto; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }}
                .header {{ border-bottom: 2px solid #005a9c; padding-bottom: 15px; margin-bottom: 20px; text-align: center; }}
                .badge {{ display: inline-block; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 14px; }}
                .badge-active {{ background: #e6f4ea; color: #137333; }}
                .badge-expired {{ background: #fce8e6; color: #c5221f; }}
                .row {{ display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }}
                .label {{ color: #64748b; font-weight: 500; }}
                .val {{ font-weight: 600; color: #1e293b; }}
            </style>
        </head>
        <body>
            <div class="card">
                <div class="header">
                    <h2 style="color:#005a9c; margin:0;">SunPower Solutions</h2>
                    <p style="margin:5px 0 0; color:#64748b; font-size:14px;">Official Digital Warranty Certificate</p>
                </div>
                <div style="text-align:center; margin-bottom: 20px;">
                    <span class="badge {'badge-active' if warranty.state == 'active' else 'badge-expired'}">
                        {warranty.state.upper()} WARRANTY
                    </span>
                </div>
                <div class="row">
                    <span class="label">Serial Number</span>
                    <span class="val">{warranty.serial_id.serial_number}</span>
                </div>
                <div class="row">
                    <span class="label">Product Model</span>
                    <span class="val">{warranty.product_id.name}</span>
                </div>
                <div class="row">
                    <span class="label">Customer Name</span>
                    <span class="val">{warranty.customer_id.name}</span>
                </div>
                <div class="row">
                    <span class="label">Commissioning Date</span>
                    <span class="val">{warranty.start_date}</span>
                </div>
                <div class="row">
                    <span class="label">Valid Until</span>
                    <span class="val">{warranty.end_date} ({warranty.warranty_years} Years Coverage)</span>
                </div>
                <div class="row">
                    <span class="label">Installation Job</span>
                    <span class="val">{warranty.job_id.name or 'Direct Dispatch'}</span>
                </div>
                <p style="text-align:center; margin-top:25px; font-size:12px; color:#94a3b8;">
                    Guaranteed by SunPower Solutions &bull; Verified via Odoo ORM Digital Provenance
                </p>
            </div>
        </body>
        </html>
        """
        return request.make_response(html, headers=[('Content-Type', 'text/html')])
