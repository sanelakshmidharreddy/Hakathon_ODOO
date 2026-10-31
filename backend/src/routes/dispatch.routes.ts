import { Router } from 'express';
import { dispatchController } from '../controllers/dispatch.controller.js';

export const dispatchRouter = Router();

dispatchRouter.get('/', dispatchController.getAll);
dispatchRouter.post('/', dispatchController.create);
