import { Request, Response } from 'express';
import { quoteService } from '../services/quote.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const quoteController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const quotes = await quoteService.getAll();
      return successResponse(res, quotes);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { leadId, customerName, capacityKw, totalAmount, equipmentCost, installationCost, labourCost, marginPercent } = req.body;
      const newQuote = await quoteService.create({
        leadId: leadId || 'lead-manual',
        customerName: customerName || 'Valued Customer',
        capacityKw: Number(capacityKw) || 3,
        totalAmount: Number(totalAmount) || 180000,
        equipmentCost: Number(equipmentCost) || 110000,
        installationCost: Number(installationCost) || 15000,
        labourCost: Number(labourCost) || 9000,
        marginPercent: Number(marginPercent) || 25,
        status: 'draft',
      });
      return successResponse(res, newQuote, 'Quote generated successfully', 201);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
};
