import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { corsMiddleware } from './config/cors.js';
import { auditLogger } from './middleware/audit.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import { apiRouter } from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Increase JSON body limit for technician photo and signature uploads
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// CORS
app.use(corsMiddleware);

// Audit logging
app.use(auditLogger);

// Health Check for Render Deployment
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'sunpower-solutions-backend',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// Primary API Router Mounted at /api
app.use('/api', apiRouter);

// Serve static frontend build if present (for monorepo / standalone mode)
const DIST_DIR = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(DIST_DIR));

// Error handling middleware
app.use(errorHandler);

export default app;
