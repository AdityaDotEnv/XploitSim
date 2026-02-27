import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./auth.ts";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

/**
 * Express middleware to ensure a valid JWT is present in the Authorization header.
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): any {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing token" });
  
  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Malformed token" });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ error: "Invalid or expired token" });

  req.user = decoded;
  next();
}

/**
 * Optional: Middleware to check for admin role
 */
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: "Admin access required" });
    }
  });
}
