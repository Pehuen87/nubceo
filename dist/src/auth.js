"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRefreshToken = exports.authenticateToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define JWT secret key (should be stored securely)
const JWT_SECRET = 'your-secret-key';
// Generate access token
function generateAccessToken(username) {
    return jsonwebtoken_1.default.sign({ username }, JWT_SECRET, { expiresIn: '15m' });
}
exports.generateAccessToken = generateAccessToken;
// Generate refresh token
function generateRefreshToken(username) {
    return jsonwebtoken_1.default.sign({ username }, JWT_SECRET, { expiresIn: '10d' });
}
exports.generateRefreshToken = generateRefreshToken;
// Middleware for authenticating access token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = (authHeader) ? authHeader.split(' ')[1] : null;
    console.log("token: ", token);
    if (!token) {
        return res.status(401).json({ error: 'Access token not provided' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid access token' });
        }
        console.log("user", user);
        req.user = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;
// Middleware for authenticating refresh token
function authenticateRefreshToken(req, res, next) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not provided' });
    }
    jsonwebtoken_1.default.verify(refreshToken, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }
        req.user = user;
        next();
    });
}
exports.authenticateRefreshToken = authenticateRefreshToken;
//# sourceMappingURL=auth.js.map