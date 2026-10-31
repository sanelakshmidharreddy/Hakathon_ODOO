import { Router, Request, Response } from 'express';
import { successResponse } from '../utils/response.js';

export const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) => {
  const { email, role } = req.body;
  const token = `jwt-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  return successResponse(res, {
    token,
    user: {
      id: `usr-${Date.now()}`,
      email: email || 'director@sunpower.in',
      role: role || 'director',
    },
  }, 'Login successful');
});
