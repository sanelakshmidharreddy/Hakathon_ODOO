import { Router } from 'express';
import { leadRouter } from './lead.routes.js';
import { quoteRouter } from './quote.routes.js';
import { dispatchRouter } from './dispatch.routes.js';
import { jobRouter } from './job.routes.js';
import { warrantyRouter } from './warranty.routes.js';
import { ticketRouter } from './ticket.routes.js';
import { analyticsRouter } from './analytics.routes.js';
import { integrationsRouter } from './integrations.routes.js';
import { authRouter } from './auth.routes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/leads', leadRouter);
apiRouter.use('/quotes', quoteRouter);
apiRouter.use('/dispatches', dispatchRouter);
apiRouter.use('/jobs', jobRouter);
apiRouter.use('/warranties', warrantyRouter);
apiRouter.use('/tickets', ticketRouter);
apiRouter.use('/analytics', analyticsRouter);
apiRouter.use('/', integrationsRouter);
