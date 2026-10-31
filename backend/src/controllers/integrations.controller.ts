import { Request, Response } from 'express';
import { solarDataService } from '../services/solar-data.service.js';
import { fetchLiveWeather } from '../integrations/openweather.integration.js';
import { geocodeAddress } from '../integrations/osm.integration.js';
import { getNrelPvdaqBenchmark } from '../integrations/pvdaq.integration.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const integrationsController = {
  getNasaPower: async (req: Request, res: Response) => {
    try {
      const city = String(req.query.city || 'jodhpur');
      const data = await solarDataService.getByCity(city);
      return res.status(200).json(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
  getWeather: async (req: Request, res: Response) => {
    try {
      const city = String(req.query.city || 'Delhi');
      const weather = await fetchLiveWeather(city);
      return res.status(200).json(weather);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
  geocode: async (req: Request, res: Response) => {
    try {
      const q = String(req.query.q || '');
      const result = await geocodeAddress(q);
      return successResponse(res, result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return errorResponse(res, message, 500);
    }
  },
  getPvdaq: async (req: Request, res: Response) => {
    return res.status(200).json(getNrelPvdaqBenchmark());
  },
};
