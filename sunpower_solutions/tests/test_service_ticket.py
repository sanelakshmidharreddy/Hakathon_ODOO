# -*- coding: utf-8 -*-
from datetime import date
from dateutil.relativedelta import relativedelta
from odoo.tests.common import TransactionCase


class TestSunPowerServiceTicket(TransactionCase):

    def setUp(self):
        super(TestSunPowerServiceTicket, self).setUp()
        self.Customer = self.env['sunpower.customer']
        self.Product = self.env['sunpower.product']
        self.Serial = self.env['sunpower.inventory.serial']
        self.Warranty = self.env['sunpower.warranty']
        self.Ticket = self.env['sunpower.service.ticket']

        self.customer = self.Customer.create({'name': 'Ticket Test Client', 'phone': '+91 96666 55555'})
        self.inverter = self.Product.create({
            'name': 'Test Hybrid Inverter 5kW',
            'product_type': 'inverter',
            'warranty_years': 2,
            'track_serial': True,
        })
        self.active_serial = self.Serial.create({
            'product_id': self.inverter.id,
            'serial_number': 'INV-ACTIVE-01',
            'status': 'under_warranty',
        })
        self.expired_serial = self.Serial.create({
            'product_id': self.inverter.id,
            'serial_number': 'INV-EXPIRED-01',
            'status': 'under_warranty',
        })

        # Active warranty
        self.active_warranty = self.Warranty.create({
            'serial_id': self.active_serial.id,
            'product_id': self.inverter.id,
            'customer_id': self.customer.id,
            'start_date': date.today(),
        })

        # Expired warranty
        self.expired_warranty = self.Warranty.create({
            'serial_id': self.expired_serial.id,
            'product_id': self.inverter.id,
            'customer_id': self.customer.id,
            'start_date': date.today() - relativedelta(years=3),
            'state': 'expired',
        })

    def test_01_active_warranty_zero_charge(self):
        """Verify active warranty tickets incur ₹0 customer charge."""
        ticket = self.Ticket.create({
            'customer_id': self.customer.id,
            'serial_id': self.active_serial.id,
            'issue_description': 'Inverter trip on high voltage',
            'fault_code': 'inverter_tripping',
        })
        ticket.action_triage()
        self.assertTrue(ticket.is_under_warranty)
        self.assertEqual(ticket.total_charge, 0.0)

    def test_02_expired_warranty_billable_charge(self):
        """Verify expired warranty tickets allow billable parts and labour charges."""
        ticket = self.Ticket.create({
            'customer_id': self.customer.id,
            'serial_id': self.expired_serial.id,
            'issue_description': 'Fan bearing replacement after 3 years',
            'repair_cost': 4500.0,
            'labour_cost': 1500.0,
        })
        ticket.action_triage()
        self.assertFalse(ticket.is_under_warranty)
        self.assertEqual(ticket.total_charge, 6000.0)
