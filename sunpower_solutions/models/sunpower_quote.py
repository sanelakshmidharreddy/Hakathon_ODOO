# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import ValidationError, UserError
from datetime import timedelta

class SunpowerQuote(models.Model):
    _name = 'sunpower.quote'
    _description = 'SunPower Solar Quotation & Auto-BOM'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'create_date DESC, id DESC'

    name = fields.Char(string='Quote Number', required=True, copy=False, readonly=True, default=lambda self: _('New'))
    customer_id = fields.Many2one('sunpower.customer', string='Customer', required=True, tracking=True)
    lead_id = fields.Many2one('sunpower.lead', string='Originating Lead', tracking=True)
    survey_id = fields.Many2one('sunpower.survey', string='Technical Survey', tracking=True)

    system_type = fields.Selection([
        ('on_grid', 'On-Grid System (Net-Metered)'),
        ('off_grid', 'Off-Grid System (Battery Storage)'),
        ('hybrid', 'Hybrid Solar System')
    ], string='System Type', default='off_grid', required=True, tracking=True)

    capacity = fields.Float(string='System Capacity (kW)', default=5.0, required=True, tracking=True)
    quote_line_ids = fields.One2many('sunpower.quote.line', 'quote_id', string='Bill of Materials (BOM)')

    amount_untaxed = fields.Float(string='Untaxed Amount (₹)', compute='_compute_financials', store=True, tracking=True)
    tax_rate = fields.Float(string='GST Rate (%)', default=12.0)
    tax_amount = fields.Float(string='GST Tax Amount (₹)', compute='_compute_financials', store=True)
    discount_amount = fields.Float(string='Discount (₹)', default=0.0, tracking=True)
    total_amount = fields.Float(string='Total Quotation Value (₹)', compute='_compute_financials', store=True, tracking=True)

    total_cost = fields.Float(string='Total BOM Cost (₹)', compute='_compute_financials', store=True)
    margin_amount = fields.Float(string='Gross Margin Amount (₹)', compute='_compute_financials', store=True)
    margin_percentage = fields.Float(string='Gross Margin (%)', compute='_compute_financials', store=True)

    state = fields.Selection([
        ('draft', 'Draft Quotation'),
        ('sent', 'Sent to Customer'),
        ('accepted', 'Accepted / Order Placed'),
        ('rejected', 'Rejected by Customer'),
        ('expired', 'Expired Validity'),
        ('converted', 'Converted to Sales Order')
    ], string='Quote Status', default='draft', required=True, tracking=True)

    validity_date = fields.Date(
        string='Valid Until',
        default=lambda self: fields.Date.today() + timedelta(days=30),
        required=True
    )

    notes = fields.Text(string='Payment Terms & Warranty Inclusions')
    order_id = fields.Many2one('sunpower.order', string='Generated Sales Order', copy=False, readonly=True)

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('name', _('New')) == _('New'):
                vals['name'] = self.env['ir.sequence'].next_by_code('sunpower.quote') or _('New')
        records = super(SunpowerQuote, self).create(vals_list)
        for rec in records:
            if not rec.quote_line_ids:
                rec.action_generate_bom()
        return records

    @api.depends('quote_line_ids.subtotal', 'quote_line_ids.subtotal_cost', 'tax_rate', 'discount_amount')
    def _compute_financials(self):
        for rec in self:
            untaxed = sum(line.subtotal for line in rec.quote_line_ids)
            cost = sum(line.subtotal_cost for line in rec.quote_line_ids)
            
            tax = round(max(0.0, (untaxed - rec.discount_amount)) * (rec.tax_rate / 100.0), 2)
            total = round(max(0.0, (untaxed - rec.discount_amount)) + tax, 2)
            margin_val = round(total - cost, 2)
            margin_pct = round((margin_val / total * 100.0), 1) if total > 0 else 0.0

            rec.amount_untaxed = untaxed
            rec.tax_amount = tax
            rec.total_amount = total
            rec.total_cost = cost
            rec.margin_amount = margin_val
            rec.margin_percentage = margin_pct

    def action_generate_bom(self):
        """Auto-generate standardized Bill of Materials based on capacity & system type"""
        self.ensure_one()
        self.quote_line_ids.unlink()

        Product = self.env['sunpower.product']
        lines = []

        # 1. Solar Panels
        panel_count = int(round(self.capacity * 2.5))  # e.g. 5kW -> 13 panels of 400W approx
        panel_prod = Product.search([('category', '=', 'panel')], limit=1)
        if panel_prod:
            lines.append((0, 0, {
                'product_id': panel_prod.id,
                'name': _("%s (%d units for %.1f kW)") % (panel_prod.name, panel_count, self.capacity),
                'quantity': float(panel_count),
                'unit_price': panel_prod.sale_price,
                'cost_price': panel_prod.cost_price,
                'required_component': True,
            }))

        # 2. Inverter
        inverter_prod = Product.search([
            ('category', '=', 'inverter'),
            ('name', 'ilike', f"{int(self.capacity)}k")
        ], limit=1) or Product.search([('category', '=', 'inverter')], limit=1)
        if inverter_prod:
            lines.append((0, 0, {
                'product_id': inverter_prod.id,
                'name': inverter_prod.name,
                'quantity': 1.0,
                'unit_price': inverter_prod.sale_price,
                'cost_price': inverter_prod.cost_price,
                'required_component': True,
            }))

        # 3. Battery - ONLY for Off-Grid or Hybrid
        if self.system_type in ('off_grid', 'hybrid'):
            battery_prod = Product.search([('category', '=', 'battery')], limit=1)
            if battery_prod:
                lines.append((0, 0, {
                    'product_id': battery_prod.id,
                    'name': battery_prod.name,
                    'quantity': 1.0 if self.capacity <= 3 else 2.0,
                    'unit_price': battery_prod.sale_price,
                    'cost_price': battery_prod.cost_price,
                    'required_component': True,
                }))
            cc_prod = Product.search([('category', '=', 'charge_controller')], limit=1)
            if cc_prod:
                lines.append((0, 0, {
                    'product_id': cc_prod.id,
                    'name': cc_prod.name,
                    'quantity': 1.0,
                    'unit_price': cc_prod.sale_price,
                    'cost_price': cc_prod.cost_price,
                    'required_component': True,
                }))

        # 4. Mounting Hardware
        mounting_prod = Product.search([('category', '=', 'mounting')], limit=1)
        if mounting_prod:
            lines.append((0, 0, {
                'product_id': mounting_prod.id,
                'name': mounting_prod.name,
                'quantity': 1.0,
                'unit_price': mounting_prod.sale_price,
                'cost_price': mounting_prod.cost_price,
                'required_component': True,
            }))

        # 5. Cabling & Wiring
        wiring_prod = Product.search([('category', '=', 'wiring')], limit=1)
        if wiring_prod:
            lines.append((0, 0, {
                'product_id': wiring_prod.id,
                'name': wiring_prod.name,
                'quantity': 1.0,
                'unit_price': wiring_prod.sale_price,
                'cost_price': wiring_prod.cost_price,
                'required_component': True,
            }))

        # 6. Safety & Earthing Kit
        safety_prod = Product.search([('category', '=', 'safety')], limit=1)
        if safety_prod:
            lines.append((0, 0, {
                'product_id': safety_prod.id,
                'name': safety_prod.name,
                'quantity': 1.0,
                'unit_price': safety_prod.sale_price,
                'cost_price': safety_prod.cost_price,
                'required_component': True,
            }))

        # 7. Installation & Commissioning Service
        service_prod = Product.search([('category', '=', 'service')], limit=1)
        if service_prod:
            lines.append((0, 0, {
                'product_id': service_prod.id,
                'name': service_prod.name,
                'quantity': 1.0,
                'unit_price': service_prod.sale_price,
                'cost_price': service_prod.cost_price,
                'required_component': True,
            }))

        self.write({'quote_line_ids': lines})
        return True

    def action_send_quote(self):
        self.ensure_one()
        if not self.quote_line_ids:
            raise UserError(_("Cannot send a quote with an empty Bill of Materials."))
        self.write({'state': 'sent'})
        self.message_post(body=_("Quotation %s for ₹%s sent to customer %s.") % (
            self.name, f"{self.total_amount:,.2f}", self.customer_id.name
        ))
        return True

    def action_accept_quote(self):
        """Converts accepted quotation to confirmed Sales Order"""
        self.ensure_one()
        if not self.quote_line_ids:
            raise UserError(_("Quotation must have valid line items before acceptance."))

        # Check required component safeguards
        has_panel = any(l.product_id.category == 'panel' for l in self.quote_line_ids)
        has_inverter = any(l.product_id.category == 'inverter' for l in self.quote_line_ids)
        if not (has_panel and has_inverter):
            raise ValidationError(_("Safety Guard: Quotation must contain at least solar panels and an inverter."))

        # Create SunPower Order
        order_vals = {
            'quote_id': self.id,
            'lead_id': self.lead_id.id if self.lead_id else False,
            'customer_id': self.customer_id.id,
            'system_type': self.system_type,
            'capacity': self.capacity,
            'total_amount': self.total_amount,
            'advance_amount': round(self.total_amount * 0.30, 2),  # Standard 30% advance
            'balance_amount': round(self.total_amount * 0.70, 2),
            'state': 'confirmed',
        }
        order = self.env['sunpower.order'].create(order_vals)

        # Mark Quote accepted and lead converted
        self.write({
            'state': 'accepted',
            'order_id': order.id,
        })
        if self.lead_id:
            self.lead_id.write({'status': 'converted'})

        self.message_post(body=_("Quote accepted! Sales Order %s created automatically.") % order.name)

        # Reserve serial numbers in warehouse inventory
        order.action_reserve_inventory()

        return {
            'name': _('Sales Order'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.order',
            'res_id': order.id,
            'view_mode': 'form',
            'target': 'current',
        }

    def action_reject_quote(self):
        self.ensure_one()
        self.write({'state': 'rejected'})
        if self.lead_id:
            self.lead_id.write({'status': 'lost'})
        return True
