import { Response } from 'express';

export function successResponse<T>(res: Response, data: T, message = 'Success', status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

export function errorResponse(res: Response, error: string, status = 400) {
  return res.status(status).json({
    success: false,
    error,
  });
}
