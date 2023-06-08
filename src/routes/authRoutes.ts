import express from 'express';
import { authenticateRefreshToken, generateTokens, authenticateUser } from '../controllers/authController';

const authRouter = express.Router({ mergeParams: true });

authRouter.post('/login', authenticateUser, generateTokens);

authRouter.post('/token', authenticateRefreshToken, generateTokens);

export default authRouter;