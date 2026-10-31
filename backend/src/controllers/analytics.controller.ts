import { Request, Response } from 'express';
import { analyticsService } from '../services/analytics.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const analyticsController = {
  getSummary: async (req: Request, res: Response) => {
    try {
      const summary = await analyticsService.getSummary();
      // Returns flat JSON directly matching frontend expectations, while also providing envelope if needed
      return res.status(200).json(summary);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
};
