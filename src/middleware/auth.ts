import { Request, Response, NextFunction } from 'express';

const TOKEN = "Password123";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (token === TOKEN) next();
  else res.status(401).json({ error: 'Unauthorized' });
};
