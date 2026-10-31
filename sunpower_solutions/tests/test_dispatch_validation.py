# -*- coding: utf-8 -*-
from odoo.tests.common import TransactionCase
from odoo.exceptions import UserError


class TestSunPowerDispatchValidation(TransactionCase):

    def setUp(self):
        super(TestSunPowerDispatchValidation, self).setUp()
        self.Customer = self.env['sunpower.customer']
        self.Quote = self.env['sunpower.quote']
        self.Order = self.env['sunpower.order']
        self.Dispatch = self.env['sunpower.dispatch']
        self.Product = self.env['sunpower.product']
        self.Serial = self.env['sunpower.inventory.serial']

        self.customer = self.Customer.create({'name': 'Dispatch Test Client', 'phone': '+91 97777 88888'})
        self.panel = self.env.ref('sunpower_solutions.product_panel_400w', raise_if_not_found=False)
        if not self.panel:
            self.panel = self.Product.create({'name': 'Test Panel 400W', 'product_type': 'panel', 'warranty_years': 20, 'track_serial': True})

        self.order = self.Order.create({
            'customer_id': self.customer.id,
            'state': 'confirmed',
        })

    def test_01_dispatch_scanning_and_gate_rule(self):
        """Verify serial scanning and gate check rule on dispatch confirmation."""
        dispatch = self.Dispatch.create({
            'order_id': self.order.id,
            'state': 'draft',
        })

        # Gate check: cannot mark dispatched without scanned serial lines
        with self.assertRaises(UserError):
            dispatch.action_confirm_dispatch()

        # Create serial and scan it
        serial = self.Serial.create({
            'product_id': self.panel.id,
            'serial_number': 'DSP-VAL-001',
            'status': 'in_stock',
        })
        res = dispatch.action_scan_serial('DSP-VAL-001')
        self.assertEqual(res.get('status'), 'success')

        # Duplicate scan must return error
        res_dup = dispatch.action_scan_serial('DSP-VAL-001')
        self.assertIn('already scanned', res_dup.get('error', '').lower())

        # Now dispatch confirmation succeeds
        dispatch.action_mark_ready()
        dispatch.action_confirm_dispatch()
        self.assertEqual(dispatch.state, 'dispatched')

        # Auto-created warranty check
        warranty = self.env['sunpower.warranty'].search([('serial_id', '=', serial.id)])
        self.assertTrue(len(warranty) >= 1)
        self.assertEqual(warranty.warranty_years, 20)
