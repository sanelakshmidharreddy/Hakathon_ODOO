# -*- coding: utf-8 -*-
from odoo.tests.common import TransactionCase
from odoo.exceptions import UserError


class TestSunPowerQuoteMargin(TransactionCase):

    def setUp(self):
        super(TestSunPowerQuoteMargin, self).setUp()
        self.Customer = self.env['sunpower.customer']
        self.Quote = self.env['sunpower.quote']
        self.Product = self.env['sunpower.product']

        self.customer = self.Customer.create({
            'name': 'Commercial Test Client',
            'phone': '+91 93333 44444',
            'city': 'Pune',
        })

    def test_01_auto_bom_and_margin_calculation(self):
        """Test auto BOM generation and margin mathematics."""
        quote = self.Quote.create({
            'customer_id': self.customer.id,
            'system_type': 'on_grid',
            'capacity': 5.0,
        })
        quote.action_generate_bom()

        # Should have generated panel, inverter, mounting, wiring, safety, service
        self.assertTrue(len(quote.quote_line_ids) >= 4)
        self.assertTrue(quote.amount_untaxed > 0)
        self.assertTrue(quote.total_amount > quote.amount_untaxed)
        self.assertTrue(quote.margin_amount > 0)
        self.assertTrue(quote.margin_percentage > 10.0)

    def test_02_off_grid_battery_inclusion(self):
        """Verify that Off-Grid systems automatically include storage batteries in BOM."""
        quote = self.Quote.create({
            'customer_id': self.customer.id,
            'system_type': 'off_grid',
            'capacity': 3.0,
        })
        quote.action_generate_bom()

        battery_lines = quote.quote_line_ids.filtered(lambda l: l.product_id.product_type == 'battery')
        self.assertTrue(len(battery_lines) >= 1)
