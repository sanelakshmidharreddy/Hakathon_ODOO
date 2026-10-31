# -*- coding: utf-8 -*-
from odoo.tests.common import TransactionCase
from odoo.exceptions import ValidationError


class TestSunPowerSerialTracking(TransactionCase):

    def setUp(self):
        super(TestSunPowerSerialTracking, self).setUp()
        self.Product = self.env['sunpower.product']
        self.Serial = self.env['sunpower.inventory.serial']

        self.panel = self.Product.create({
            'name': 'SunTest 450W Panel',
            'product_type': 'panel',
            'warranty_years': 20,
            'track_serial': True,
        })

    def test_01_serial_uniqueness(self):
        """Verify unique constraint on serial numbers for a given product."""
        self.Serial.create({
            'product_id': self.panel.id,
            'serial_number': 'TESTPAN-001',
            'status': 'in_stock',
        })

        with self.assertRaises(Exception):
            self.Serial.create({
                'product_id': self.panel.id,
                'serial_number': 'TESTPAN-001',
                'status': 'in_stock',
            })
