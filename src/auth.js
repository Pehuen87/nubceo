"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRefreshToken = exports.authenticateToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
// Define JWT secret key (should be stored securely)
var JWT_SECRET = 'your-secret-key';
// Generate access token
function generateAccessToken(username) {
    return jsonwebtoken_1.default.sign({ username: username }, JWT_SECRET, { expiresIn: '15m' });
}
exports.generateAccessToken = generateAccessToken;
// Generate refresh token
function generateRefreshToken(username) {
    return jsonwebtoken_1.default.sign({ username: username }, JWT_SECRET, { expiresIn: '7d' });
}
exports.generateRefreshToken = generateRefreshToken;
// Middleware for authenticating access token
function authenticateToken(req, res, next) {
    next();
    /*
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return //res.status(401).json({ error: 'Access token not provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid access token' });
        }

        //req.user = user;
        next();
    });*/
}
exports.authenticateToken = authenticateToken;
// Middleware for authenticating refresh token
function authenticateRefreshToken(req, res, next) {
    var refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return; // res.status(401).json({ error: 'Refresh token not provided' });
    }
    jsonwebtoken_1.default.verify(refreshToken, JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }
        //req.user = user;
        next();
    });
}
exports.authenticateRefreshToken = authenticateRefreshToken;
