"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and dependencies
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth"); // Functions for JWT authentication
// Create an instance of Express.js
const app = (0, express_1.default)();
// Define middleware for parsing JSON data
app.use(express_1.default.json());
// Define JWT secret key (should be stored securely)
const JWT_SECRET = 'your-secret-key';
// Define sample data
const movies = [
    { id: '1', title: 'Movie 1', genre: 'Action', director: 'Director 1', actors: ['Actor 1', 'Actor 2'] },
    { id: '2', title: 'Movie 2', genre: 'Comedy', director: 'Director 2', actors: ['Actor 3', 'Actor 4'] },
];
const tvShows = [
    {
        id: '1',
        title: 'TV Show 1',
        genre: 'Drama',
        seasons: 3,
        episodes: [
            { id: '1', title: 'Episode 1', director: 'Director 1', season: 1 },
            { id: '2', title: 'Episode 2', director: 'Director 3', season: 2 },
        ],
        actors: ['Actor 1', 'Actor 3'],
    },
];
const actors = [
    { id: '1', name: 'Actor 1', movies: ['Movie 1'], tvShows: ['TV Show 1'] },
    { id: '2', name: 'Actor 2', movies: ['Movie 1'], tvShows: [] },
    { id: '3', name: 'Actor 3', movies: [], tvShows: ['TV Show 1'] },
];
const directors = [
    { id: '1', name: 'Director 1', movies: ['Movie 1'], tvShowEpisodes: ['Episode 1'] },
    { id: '2', name: 'Director 2', movies: ['Movie 2'], tvShowEpisodes: [] },
    { id: '3', name: 'Director 3', movies: [], tvShowEpisodes: ['Episode 2'] },
];
// Define API endpoints
// Authentication using JWT
app.post('/auth/login', (req, res) => {
    // Perform authentication logic (e.g., validate username and password)
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
    const { genre, sortBy } = req.query;
    let filteredMovies = [...movies];
    // Filter movies by genre if provided
    if (genre) {
        filteredMovies = filteredMovies.filter((movie) => movie.genre.toLowerCase() === genre.toString().toLowerCase());
    }
    // Sort movies by the specified field if provided
    if (sortBy) {
        filteredMovies.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }
    res.json(filteredMovies);
});
// Retrieve information of a specific TV show episode
app.get('/tvshows/:id/episodes/:episodeId', auth_1.authenticateToken, (req, res) => {
    const { id, episodeId } = req.params;
    // Find the TV show by ID
    const tvShow = tvShows.find((show) => show.id === id);
    if (!tvShow) {
        return res.status(404).json({ error: 'TV show not found' });
    }
    // Find the episode by ID
    const episode = tvShow.episodes.find((ep) => ep.id === episodeId);
    if (!episode) {
        return res.status(404).json({ error: 'Episode not found' });
    }
    // Find the director of the episode
    const director = directors.find((dir) => dir.name === episode.director);
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