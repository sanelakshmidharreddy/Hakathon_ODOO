import { Request, Response } from 'express';
import { jobService } from '../services/job.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const jobController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const jobs = await jobService.getAll();
      return successResponse(res, jobs);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
  updateProgress: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { completionPercentage, status } = req.body;
      const updated = await jobService.updateProgress(id, Number(completionPercentage), status);
      if (!updated) return errorResponse(res, 'Job not found', 404);
      return successResponse(res, updated, 'Job progress updated');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
};
