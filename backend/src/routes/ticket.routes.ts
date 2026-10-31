import { Router } from 'express';
import { ticketController } from '../controllers/ticket.controller.js';

export const ticketRouter = Router();

ticketRouter.get('/', ticketController.getAll);
ticketRouter.post('/', ticketController.create);
