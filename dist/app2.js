"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and dependencies
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const authController_1 = require("./controllers/authController"); // Functions for JWT authentication
const db_1 = require("./config/db");
// Create an instance of Express.js
const app = (0, express_1.default)();
// Connect to MongoDB
(0, db_1.connectToDatabase)();
// Define middleware for parsing JSON data
app.use(express_1.default.json());
// Define sample data with mock 
let db;
// Define API endpoints
// Authentication using JWT
app.post('/auth/login', (req, res) => {
    // Perform authentication logic TODO
    const { username, password } = req.body;
    // Generate and return access token and refresh token upon successful authentication
    const accessToken = (0, authController_1.generateAccessToken)(username);
    const refreshToken = (0, authController_1.generateRefreshToken)(username);
    res.json({ accessToken, refreshToken });
});
// Refresh JWT access token
app.post('/auth/token', authController_1.authenticateRefreshToken, (req, res) => {
    // Generate and return new access token
    const { username, password } = req.body;
    const accessToken = (0, authController_1.generateAccessToken)(username);
    res.json({ accessToken });
});
// Retrieve movies with filtering and sorting
app.get('/movies', authController_1.authenticateToken, (req, res) => {
    // Get query parameters for filtering and sorting
    const genre = req.query.genre;
    const title = req.query.title;
    const plot = req.query.plot;
    const sortBy = req.query.sortBy;
    let filteredMovies = [...db.movies];
    // Filter movies by genre if provided
    if (genre) {
        filteredMovies = filteredMovies.filter((movie) => movie.genre.toLowerCase() === genre.toLowerCase());
    }
    // Filter movies by title if provided
    if (title) {
        filteredMovies = filteredMovies.filter((movie) => movie.title.toLowerCase() === title.toLowerCase());
    }
    // Filter movies by plot if provided
    if (plot) {
        filteredMovies = filteredMovies.filter((movie) => movie.plot.toLowerCase() === plot.toLowerCase());
    }
    // Sort movies by the specified field if provided
    if (sortBy)
        filteredMovies.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    res.json(filteredMovies);
});
app.get('/actors', authController_1.authenticateToken, (req, res) => {
    res.json(db.actors);
});
app.get('/directors', authController_1.authenticateToken, (req, res) => {
    res.json(db.directors);
});
app.get('/tvshows', authController_1.authenticateToken, (req, res) => {
    res.json(db.tvshows);
});
// Retrieve information of a specific TV show episode
app.get('/tvshows/:id/episodes/:episodeId', authController_1.authenticateToken, (req, res) => {
    const { id, episodeId } = req.params;
    // Find the TV show by ID
    const tvShow = db.tvshows.find((show) => show.id === id);
    if (!tvShow) {
        return res.status(404).json({ error: 'TV show not found' });
    }
    // Find the episode by ID
    const episode = tvShow.episodes.find((ep) => ep.episodeId === episodeId);
    if (!episode) {
        return res.status(404).json({ error: 'Episode not found' });
    }
    // Find the director of the episode
    const director = db.directors.find((dir) => dir._id === episode.director);
    if (!director) {
        return res.status(404).json({ error: 'Director not found' });
    }
    const episodeWithDirector = Object.assign(Object.assign({}, episode), { director: director.name });
    res.json(episodeWithDirector);
});
// Retrieve information of a specific TV show episode
app.get('/tvshows/:id/episodes/', authController_1.authenticateToken, (req, res) => {
    const { id } = req.params;
    // Find the TV show by ID
    const tvShow = db.tvshows.find((show) => show.id === id);
    if (!tvShow) {
        return res.status(404).json({ error: 'TV show not found' });
    }
    res.json(tvShow.episodes);
});
// Add a new object (e.g., movie, TV show, actor, director)
app.post('/objects', authController_1.authenticateToken, (req, res) => {
    const { type, object } = req.body;
    // Perform validation and add the object to the appropriate array (e.g., movies, tvShows, actors, directors)
    res.json({ success: true });
});
// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
//# sourceMappingURL=app2.js.map