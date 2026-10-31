import { app } from './app.js';
import { config } from './config/env.js';
import { logger } from './utils/logger.js';

const PORT = config.port;

app.listen(PORT, '0.0.0.0', () => {
  logger.info(`SunPower Solutions API running on port ${PORT} [Env: ${config.nodeEnv}]`);
  logger.info(`Health check active at http://localhost:${PORT}/health`);
  logger.info(`CORS allowed origins: ${config.frontendUrl}`);
});
