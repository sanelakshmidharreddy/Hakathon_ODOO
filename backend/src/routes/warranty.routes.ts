import { Router } from 'express';
import { warrantyController } from '../controllers/warranty.controller.js';

export const warrantyRouter = Router();

warrantyRouter.get('/', warrantyController.getAll);
warrantyRouter.post('/activate', warrantyController.activate);
