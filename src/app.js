"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and dependencies
var express_1 = require("express");
var auth_1 = require("./auth"); // Functions for JWT authentication
var mock = require("./helpers/mock");
// Create an instance of Express.js
var app = (0, express_1.default)();
// Define middleware for parsing JSON data
app.use(express_1.default.json());
// Define sample data with mock 
var movies = mock.generateMovies(5);
var tvShows = mock.generateTVShows(4);
var directors = mock.generateDirectors(3);
var actors = mock.generateActors(3);
// Define API endpoints
// Authentication using JWT
app.post('/auth/login', function (req, res) {
    // Perform authentication logic (e.g., validate username and password)
    var _a = req.body, username = _a.username, password = _a.password;
    // Generate and return access token and refresh token upon successful authentication
    var accessToken = (0, auth_1.generateAccessToken)(username);
    var refreshToken = (0, auth_1.generateRefreshToken)(username);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
});
// Refresh JWT access token
app.post('/auth/token', auth_1.authenticateRefreshToken, function (req, res) {
    // Generate and return new access token
    var _a = req.body, username = _a.username, password = _a.password;
    var accessToken = (0, auth_1.generateAccessToken)(username);
    res.json({ accessToken: accessToken });
});
// Retrieve movies with filtering and sorting
app.get('/movies', auth_1.authenticateToken, function (req, res) {
    // Get query parameters for filtering and sorting
    var genre = req.query.genre;
    var sortBy = req.query.sortBy;
    var filteredMovies = __spreadArray([], movies, true);
    // Filter movies by genre if provided
    if (genre) {
        filteredMovies = filteredMovies.filter(function (movie) { return movie.genre.toLowerCase() === genre.toLowerCase(); });
    }
    // Sort movies by the specified field if provided
    filteredMovies.sort(function (a, b) { return a[sortBy].localeCompare(b[sortBy]); });
    res.json(filteredMovies);
});
// Retrieve information of a specific TV show episode
app.get('/tvshows/:id/episodes/:episodeId', auth_1.authenticateToken, function (req, res) {
    var _a = req.params, id = _a.id, episodeId = _a.episodeId;
    // Find the TV show by ID
    var tvShow = tvShows.find(function (show) { return show.id === id; });
    if (!tvShow) {
        return res.status(404).json({ error: 'TV show not found' });
    }
    // Find the episode by ID
    var episode = tvShow.episodes.find(function (ep) { return ep.id === episodeId; });
    if (!episode) {
        return res.status(404).json({ error: 'Episode not found' });
    }
    // Find the director of the episode
    var director = directors.find(function (dir) { return dir.name === episode.director; });
    if (!director) {
        return res.status(404).json({ error: 'Director not found' });
    }
    var episodeWithDirector = __assign(__assign({}, episode), { director: director.name });
    res.json(episodeWithDirector);
});
// Add a new object (e.g., movie, TV show, actor, director)
app.post('/objects', auth_1.authenticateToken, function (req, res) {
    var _a = req.body, type = _a.type, object = _a.object;
    // Perform validation and add the object to the appropriate array (e.g., movies, tvShows, actors, directors)
    res.json({ success: true });
});
// Start the server
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
