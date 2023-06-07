"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and dependencies
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth"); // Functions for JWT authentication
const mock = __importStar(require("../helpers/mock"));
// Create an instance of Express.js
const app = (0, express_1.default)();
// Define middleware for parsing JSON data
app.use(express_1.default.json());
// Define sample data with mock 
const db = mock.generateDB();
// Define API endpoints
// Authentication using JWT
app.post('/auth/login', (req, res) => {
    // Perform authentication logic TODO
    const { username, password } = req.body;
    // Generate and return access token and refresh token upon successful authentication
    const accessToken = (0, auth_1.generateAccessToken)(username);
    const refreshToken = (0, auth_1.generateRefreshToken)(username);
    res.json({ accessToken, refreshToken });
});
// Refresh JWT access token
app.post('/auth/token', auth_1.authenticateRefreshToken, (req, res) => {
    // Generate and return new access token
    const { username, password } = req.body;
    const accessToken = (0, auth_1.generateAccessToken)(username);
    res.json({ accessToken });
});
// Retrieve movies with filtering and sorting
app.get('/movies', auth_1.authenticateToken, (req, res) => {
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
app.get('/actors', auth_1.authenticateToken, (req, res) => {
    res.json(db.actors);
});
app.get('/directors', auth_1.authenticateToken, (req, res) => {
    res.json(db.directors);
});
// Retrieve information of a specific TV show episode
app.get('/tvshows/:id/episodes/:episodeId', auth_1.authenticateToken, (req, res) => {
    const { id, episodeId } = req.params;
    // Find the TV show by ID
    const tvShow = db.tvshows.find((show) => show.id === id);
    if (!tvShow) {
        return res.status(404).json({ error: 'TV show not found' });
    }
    // Find the episode by ID
    const episode = tvShow.episodes.find((ep) => ep.id === episodeId);
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
// Add a new object (e.g., movie, TV show, actor, director)
app.post('/objects', auth_1.authenticateToken, (req, res) => {
    const { type, object } = req.body;
    // Perform validation and add the object to the appropriate array (e.g., movies, tvShows, actors, directors)
    res.json({ success: true });
});
// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=app.js.map