# -*- coding: utf-8 -*-
from datetime import date
from dateutil.relativedelta import relativedelta
from odoo.tests.common import TransactionCase


class TestSunPowerWarrantyAutomation(TransactionCase):

    def setUp(self):
        super(TestSunPowerWarrantyAutomation, self).setUp()
        self.Customer = self.env['sunpower.customer']
        self.Product = self.env['sunpower.product']
        self.Serial = self.env['sunpower.inventory.serial']
        self.Warranty = self.env['sunpower.warranty']

        self.customer = self.Customer.create({'name': 'Warranty Test Owner', 'phone': '+91 95555 66666'})
        self.panel = self.Product.create({
            'name': 'Longi 450W Hi-MO 5',
            'product_type': 'panel',
            'warranty_years': 20,
            'track_serial': True,
        })
        self.serial = self.Serial.create({
            'product_id': self.panel.id,
            'serial_number': 'LGI-998877',
            'status': 'in_stock',
        })

    def test_01_warranty_dates_and_duration(self):
        """Verify 20-year end date calculation from start date."""
        today = date.today()
        warranty = self.Warranty.create({
            'serial_id': self.serial.id,
            'product_id': self.panel.id,
            'customer_id': self.customer.id,
            'start_date': today,
        })

        expected_end = today + relativedelta(years=20)
        self.assertEqual(warranty.end_date, expected_end)
        self.assertEqual(warranty.warranty_years, 20)
        self.assertEqual(warranty.state, 'active')

    def test_02_scheduled_action_expiry(self):
        """Verify nightly cron check changes expired records to 'expired'."""
        past_date = date.today() - relativedelta(years=21)
        warranty = self.Warranty.create({
            'serial_id': self.serial.id,
            'product_id': self.panel.id,
            'customer_id': self.customer.id,
            'start_date': past_date,
        })
        # Run scheduled cron action
        self.Warranty._cron_update_warranty_status()
        warranty.refresh()
        self.assertEqual(warranty.state, 'expired')
