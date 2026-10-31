import { Request, Response } from 'express';
import { ticketService } from '../services/ticket.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const ticketController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const tickets = await ticketService.getAll();
      return successResponse(res, tickets);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { customerName, city, issueType, priority } = req.body;
      const ticket = await ticketService.create({
        customerName: customerName || 'Customer',
        city: city || 'City',
        issueType: issueType || 'routine_maintenance',
        priority: priority || 'medium',
        status: 'open',
      });
      return successResponse(res, ticket, 'Service ticket logged', 201);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
};
