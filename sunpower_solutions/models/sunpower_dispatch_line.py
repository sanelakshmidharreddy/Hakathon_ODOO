# -*- coding: utf-8 -*-
from odoo import models, fields, api, _

class SunpowerDispatchLine(models.Model):
    _name = 'sunpower.dispatch.line'
    _description = 'SunPower Dispatch Manifest Line'
    _order = 'id ASC'

    dispatch_id = fields.Many2one('sunpower.dispatch', string='Dispatch Manifest', required=True, ondelete='cascade')
    product_id = fields.Many2one('sunpower.product', string='Equipment Product', required=True)
    category = fields.Selection(related='product_id.category', string='Category', readonly=True)
    track_serial = fields.Boolean(related='product_id.track_serial', string='Requires Serial Scan')

    quantity_required = fields.Float(string='Manifest Qty', default=1.0, required=True)
    scanned_serial_ids = fields.Many2many(
        'sunpower.inventory.serial',
        'sunpower_dispatch_line_serial_rel',
        'line_id', 'serial_id',
        string='Scanned Serial Numbers'
    )
    quantity_scanned = fields.Float(string='Scanned Qty', compute='_compute_scanned_count', store=True)
    is_complete = fields.Boolean(string='Verification Complete', compute='_compute_scanned_count', store=True)

    @api.depends('scanned_serial_ids', 'quantity_required', 'track_serial')
    def _compute_scanned_count(self):
        for line in self:
            if line.track_serial:
                count = len(line.scanned_serial_ids)
                line.quantity_scanned = count
                line.is_complete = count >= line.quantity_required
            else:
                line.quantity_scanned = line.quantity_required
                line.is_complete = True
