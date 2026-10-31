import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { errorResponse } from '../utils/response.js';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(`Unhandled error during ${req.method} ${req.url}: ${err.message}`, { stack: err.stack });
  return errorResponse(res, err.message || 'Internal Server Error', 500);
}
