"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movies = void 0;
const mock_1 = require("../helpers/mock");
const movies = (req, res) => {
    // Get query parameters for filtering and sorting
    const genre = req.query.genre;
    const title = req.query.title;
    const plot = req.query.plot;
    const sortBy = req.query.sortBy;
    let filteredMovies = [...(0, mock_1.generateDB)().movies];
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
};
exports.movies = movies;
//# sourceMappingURL=movieController.js.map