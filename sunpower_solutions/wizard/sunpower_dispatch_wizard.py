# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import UserError

class SunpowerDispatchWizard(models.TransientModel):
    _name = 'sunpower.dispatch.wizard'
    _description = 'Serial Scanner & Dispatch Validation Wizard'

    dispatch_id = fields.Many2one('sunpower.dispatch', string='Dispatch Manifest', required=True)
    scanned_barcode = fields.Char(string='Scan / Input Barcode', required=True)
    last_scan_message = fields.Char(string='Scanner Telemetry', readonly=True)

    def action_submit_scan(self):
        self.ensure_one()
        res = self.dispatch_id.scan_serial_barcode(self.scanned_barcode)
        if res.get('status') == 'error':
            raise UserError(res.get('message'))
        
        self.write({
            'scanned_barcode': '',
            'last_scan_message': res.get('message')
        })
        return {
            'name': _('Barcode Scan Session'),
            'type': 'ir.actions.act_window',
            'res_model': 'sunpower.dispatch.wizard',
            'res_id': self.id,
            'view_mode': 'form',
            'target': 'new',
        }
