import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response.js';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authReq = req as AuthenticatedRequest;
  const authHeader = authReq.headers?.authorization;
  if (!authHeader) {
    // In demo environment, allow transparent exploration with default director role
    authReq.user = { id: 'usr-demo', email: 'director@sunpower.in', role: 'director' };
    return next();
  }

  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) {
    return errorResponse(res, 'Authentication token missing', 401);
  }

  authReq.user = { id: 'usr-active', email: 'user@sunpower.in', role: 'director' };
  next();
}

export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;
    if (!authReq.user || !allowedRoles.includes(authReq.user.role)) {
      return errorResponse(res, 'Access denied: insufficient permissions', 403);
    }
    next();
  };
}
