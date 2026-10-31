import { Request, Response } from 'express';
import { warrantyService } from '../services/warranty.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const warrantyController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const warranties = await warrantyService.getAll();
      return successResponse(res, warranties);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
  activate: async (req: Request, res: Response) => {
    try {
      const { orderId, customerName, capacityKw } = req.body;
      const warranty = await warrantyService.createFromJob(
        orderId || 'SO-AUTO',
        customerName || 'Customer',
        Number(capacityKw) || 3
      );
      return successResponse(res, warranty, 'Warranty policy auto-activated', 201);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
};
