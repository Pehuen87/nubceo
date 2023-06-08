"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and dependencies
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_1 = require("./config/db");
const tvShowRoutes_1 = __importDefault(require("./routes/tvShowRoutes"));
const episodeRoutes_1 = __importDefault(require("./routes/episodeRoutes"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authController_1 = require("./controllers/authController");
// Create an instance of Express.js
const app = (0, express_1.default)();
// Connect to MongoDB
(0, db_1.connectToDatabase)();
// Define middleware for parsing JSON data
app.use(express_1.default.json());
// Define API endpoints
app.use('/auth/', authRoutes_1.default);
app.use('/tvshows', authController_1.authenticateToken, tvShowRoutes_1.default);
app.use('/tvshows/:id/episodes', authController_1.authenticateToken, episodeRoutes_1.default);
app.use('/movies', authController_1.authenticateToken, movieRoutes_1.default);
// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
//# sourceMappingURL=app.js.map