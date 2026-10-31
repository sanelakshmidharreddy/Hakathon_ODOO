# -*- coding: utf-8 -*-
from odoo.tests.common import TransactionCase
from odoo.exceptions import ValidationError, UserError


class TestSunPowerLeadFlow(TransactionCase):

    def setUp(self):
        super(TestSunPowerLeadFlow, self).setUp()
        self.Customer = self.env['sunpower.customer']
        self.Lead = self.env['sunpower.lead']
        self.Survey = self.env['sunpower.survey']
        self.Quote = self.env['sunpower.quote']

        self.customer = self.Customer.create({
            'name': 'Test Solar Consumer',
            'phone': '+91 91111 22222',
            'email': 'consumer@test.com',
            'city': 'Bengaluru',
        })

    def test_01_lead_creation_and_duplicate_prevention(self):
        """Test lead creation and duplicate phone active constraint."""
        lead1 = self.Lead.create({
            'customer_id': self.customer.id,
            'source': 'web_form',
            'system_type': 'on_grid',
            'monthly_bill': 4500.0,
            'status': 'new',
        })
        self.assertTrue(lead1.name.startswith('LEAD-'))
        self.assertAlmostEqual(lead1.requested_capacity, 3.6, delta=0.5)

        # Attempt duplicate active lead
        with self.assertRaises(ValidationError):
            self.Lead.create({
                'customer_id': self.customer.id,
                'source': 'phone_call',
                'status': 'contacted',
            })

    def test_02_survey_gate_before_quote(self):
        """Verify that a quote cannot be created before technical survey is approved."""
        lead = self.Lead.create({
            'customer_id': self.customer.id,
            'source': 'referral',
            'status': 'new',
        })

        # Cannot create quote directly while survey is draft/not completed
        with self.assertRaises(UserError):
            lead.action_create_quote()

        # Create and approve survey
        survey = self.Survey.create({
            'lead_id': lead.id,
            'roof_direction': 'south',
            'roof_tilt': 15.0,
            'shadow_free_area': 400.0,
            'state': 'draft',
        })
        survey.action_complete()
        survey.action_approve()
        self.assertEqual(survey.state, 'approved')

        # Now quote creation succeeds
        action = lead.action_create_quote()
        self.assertEqual(action.get('res_model'), 'sunpower.quote')
