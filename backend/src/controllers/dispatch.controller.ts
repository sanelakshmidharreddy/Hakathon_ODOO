import { Request, Response } from 'express';
import { dispatchService } from '../services/dispatch.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const dispatchController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const dispatches = await dispatchService.getAll();
      return successResponse(res, dispatches);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { orderId, destination, truckNumber, serialCount } = req.body;
      const newDispatch = await dispatchService.create({
        orderId: orderId || 'SO-MANUAL',
        destination: destination || 'Site Address',
        truckNumber: truckNumber || 'DL-01-AB-1234',
        serialCount: Number(serialCount) || 12,
        status: 'dispatched',
      });
      return successResponse(res, newDispatch, 'Dispatch recorded', 201);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
};
