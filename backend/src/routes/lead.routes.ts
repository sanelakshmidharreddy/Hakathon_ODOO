import { Router } from 'express';
import { leadController } from '../controllers/lead.controller.js';

export const leadRouter = Router();

leadRouter.get('/', leadController.getAll);
leadRouter.post('/', leadController.create);
leadRouter.patch('/:id/status', leadController.updateStatus);
