import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define JWT secret key (should be stored securely)
const JWT_SECRET = process.env.JWT_SECRET;

// Extend request to allow user
interface AuthenticatedRequest extends Request {
  user?: { username: string };
}

// Generate access token
export function generateAccessToken(username: string): string {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '15m' });
}

// Generate refresh token
export function generateRefreshToken(username: string): string {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '10d' });
}

// Middleware for authenticating access token
export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = (authHeader)? authHeader.split(' ')[1] : null;

  console.log("token: ",token);

  if (!token) {
    return res.status(401).json({ error: 'Access token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid access token' });
    }

    
    req.user = decoded.username;
    next();
  });
}

// Middleware for authenticating refresh token
export function authenticateRefreshToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token not provided' });
  }


  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }
    req.user = decoded.username;
    next();
  });
}
