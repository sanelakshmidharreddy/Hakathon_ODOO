import { Request, Response } from 'express';
import { leadService } from '../services/lead.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const leadController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const leads = await leadService.getAll();
      return successResponse(res, leads);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { customerName, phone, city, state, systemCapacityKw, solarScore, monthlyBill } = req.body;
      if (!customerName || !phone) {
        return errorResponse(res, 'Customer name and phone are required', 400);
      }
      const newLead = await leadService.create({
        customerName,
        phone,
        city: city || 'Unknown',
        state: state || 'Unknown',
        status: 'new',
        systemCapacityKw: Number(systemCapacityKw) || 3,
        solarScore: Number(solarScore) || 85,
        monthlyBill: Number(monthlyBill) || 3000,
      });
      return successResponse(res, newLead, 'Lead created successfully', 201);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
  updateStatus: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await leadService.updateStatus(id, status);
      if (!updated) return errorResponse(res, 'Lead not found', 404);
      return successResponse(res, updated, 'Lead status updated');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
};
