import { Router } from 'express';
import { jobController } from '../controllers/job.controller.js';

export const jobRouter = Router();

jobRouter.get('/', jobController.getAll);
jobRouter.patch('/:id/progress', jobController.updateProgress);
