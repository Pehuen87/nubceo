"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRefreshToken = exports.authenticateToken = exports.generateTokens = exports.authenticateUser = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define JWT secret key (should be stored securely)
const JWT_SECRET = process.env.JWT_SECRET;
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
// Middleware for authenticating username and password
function authenticateUser(req, res, next) {
    const { username, password } = req.body;
    const a = 1;
    if (a === 1)
        req.user = username;
    else
        return res.status(403).json({ error: 'Invalid user or password' });
    next();
}
exports.authenticateUser = authenticateUser;
// Generate tokens
function generateTokens(req, res) {
    // Generate and return new access and refresh token
    const { username } = req.user;
    const accessToken = generateAccessToken(username);
    const refreshToken = generateRefreshToken(username);
    res.json({ accessToken, refreshToken });
}
exports.generateTokens = generateTokens;
// Middleware for authenticating access token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = (authHeader) ? authHeader.split(' ')[1] : null;
    console.log("token: ", token);
    if (!token) {
        return res.status(401).json({ error: 'Access token not provided' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid access token' });
        }
        req.user = decoded.username;
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
    jsonwebtoken_1.default.verify(refreshToken, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }
        req.user = decoded.username;
        next();
    });
}
exports.authenticateRefreshToken = authenticateRefreshToken;
//# sourceMappingURL=authController.js.map