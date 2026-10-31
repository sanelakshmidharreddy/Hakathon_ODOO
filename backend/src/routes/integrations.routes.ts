import { Router } from 'express';
import { integrationsController } from '../controllers/integrations.controller.js';

export const integrationsRouter = Router();

integrationsRouter.get('/nasa-power', integrationsController.getNasaPower);
integrationsRouter.get('/openweather', integrationsController.getWeather);
integrationsRouter.get('/geocode', integrationsController.geocode);
integrationsRouter.get('/pvdaq', integrationsController.getPvdaq);
