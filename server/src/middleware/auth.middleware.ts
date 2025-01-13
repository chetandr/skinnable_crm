import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import CustomRequest from '../interfaces/customRequest.interface';
const JWT_SECRET = 'your_secret_key';


export const authMiddleware: RequestHandler = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // You can store the decoded user info in req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};