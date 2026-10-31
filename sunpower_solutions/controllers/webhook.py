# -*- coding: utf-8 -*-
import json
import logging
from odoo import http
from odoo.http import request

_logger = logging.getLogger(__name__)


class SunPowerWebhookController(http.Controller):

    @http.route('/api/v1/webhook/lead', type='json', auth='public', methods=['POST'], csrf=False)
    def receive_lead_webhook(self, **post):
        """Receive inbound lead from website contact form or WhatsApp Business webhook."""
        data = request.jsonrequest if hasattr(request, 'jsonrequest') else post
        name = data.get('name')
        phone = data.get('phone')
        email = data.get('email')
        city = data.get('city')
        monthly_bill = data.get('monthly_bill', 0.0)
        system_type = data.get('system_type', 'on_grid')
        source = data.get('source', 'web_form')

        if not name or not phone:
            return {"status": "error", "message": "Customer name and phone number are required."}

        # Find or create customer
        Customer = request.env['sunpower.customer'].sudo()
        customer = Customer.search([('phone', '=', phone)], limit=1)
        if not customer:
            customer = Customer.create({
                'name': name,
                'phone': phone,
                'email': email,
                'city': city or 'Bengaluru',
            })

        # Check for active duplicate lead
        Lead = request.env['sunpower.lead'].sudo()
        existing_lead = Lead.search([
            ('customer_id', '=', customer.id),
            ('status', 'not in', ('converted', 'lost'))
        ], limit=1)

        if existing_lead:
            return {
                "status": "exists",
                "message": "An active lead for this contact already exists.",
                "lead_id": existing_lead.id,
                "lead_name": existing_lead.name,
            }

        # Create new lead
        lead = Lead.create({
            'customer_id': customer.id,
            'source': source,
            'system_type': system_type,
            'monthly_bill': float(monthly_bill or 0.0),
            'status': 'new',
        })

        return {
            "status": "success",
            "message": "Lead registered successfully.",
            "lead_id": lead.id,
            "lead_name": lead.name,
            "customer_id": customer.id,
        }
