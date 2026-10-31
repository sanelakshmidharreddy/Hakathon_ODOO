# -*- coding: utf-8 -*-
from odoo import models, fields

class SunpowerSignature(models.Model):
    _name = 'sunpower.signature'
    _description = 'SunPower Digital Customer Sign-Off Signature'
    _order = 'signed_at DESC'

    name = fields.Char(string='Signer Name', required=True)
    job_id = fields.Many2one('sunpower.job', string='Installation Job Reference', required=True, ondelete='cascade')
    
    signature_image = fields.Binary(string='Signature Canvas', required=True, attachment=True)
    signed_at = fields.Datetime(string='Signed Timestamp', default=fields.Datetime.now)
    ip_address = fields.Char(string='Signer IP Address', default='127.0.0.1')
    
    confirmation_text = fields.Text(
        string='Customer Declaration',
        default="I hereby confirm that the rooftop solar installation has been completed, generation tested, and handed over to my full satisfaction."
    )
