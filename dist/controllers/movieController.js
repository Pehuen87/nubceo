"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovie = exports.getAllMovies = exports.getMovie = void 0;
// GET /movies/:id
function getMovie(req, res) {
    const movieId = req.params.id;
    // Retrieve Movie details using the ID
    // Example: const movie = await Movie.findById(MovieId);
    res.send(`Movie ID: ${movieId}`);
}
exports.getMovie = getMovie;
// GET /movies
function getAllMovies(req, res) {
    // Get query parameters for filtering and sorting
    const genre = req.query.genre;
    const title = req.query.title;
    const plot = req.query.plot;
    const sortBy = req.query.sortBy;
    let filteredMovies = [ /*...db.movies*/];
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
}
exports.getAllMovies = getAllMovies;
// POST /movies
function createMovie(req, res) {
    // Create a new movie using the request body
    // Example: const newMovie = await Movie.create(req.body);
    res.send('New Movie created');
}
exports.createMovie = createMovie;
//# sourceMappingURL=movieController.js.map