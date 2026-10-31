import { Router } from 'express';
import { quoteController } from '../controllers/quote.controller.js';

export const quoteRouter = Router();

quoteRouter.get('/', quoteController.getAll);
quoteRouter.post('/', quoteController.create);
