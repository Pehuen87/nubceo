import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

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




// Middleware for authenticating username and password
export function authenticateUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;
  if (validatePassword(username, password)) req.user = username
  else return res.status(403).json({ error: 'Invalid user or password' });

  next();
}

//
function validatePassword(
  username: String,
  password: String
): Boolean {
  // Find stored hashed password for provided username
  //const storedHashedPassword = UserRepository.findByUsername(username).hashedPasword;
  const hashedPassword = bcrypt.hash(password, 10);
  bcrypt.compare(password, /*stored*/hashedPassword)
    .then(res => {
      return true;
    })
    .catch(err => {
      //TODO Disable all tokens from provided username
      return false;
    })
  return true;
}

// Generate tokens
export function generateTokens(
  req: AuthenticatedRequest,
  res: Response
) {
  // Generate and return new access and refresh token
  const { username } = req.user;
  const accessToken = generateAccessToken(username);
  const refreshToken = generateRefreshToken(username);

  res.json({ accessToken, refreshToken });
}


// Middleware for authenticating access token
export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = (authHeader) ? authHeader.split(' ')[1] : null;


  if (!token) {
    return res.status(401).json({ error: 'Access token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid access token' });
    }
    req.user = decoded.username;
  });

  //TODO Verify if the provided username doesn't have disabled tokens.
  /*
  userRepository.verifyTokenAvailable(req.user) => { 
    if (err) {
      return res.status(403).json({ error: 'Invalid access token' });
    }
  }*/
  next();
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
  });

  //TODO Verify if the provided username doesn't have disabled tokens.
  /*
  userRepository.verifyTokenAvailable(req.user) => { 
    if (err) {
      return res.status(403).json({ error: 'Invalid access token' });
    }
  }*/
  next();
}
