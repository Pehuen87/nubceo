"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovie = exports.getAllMovies = exports.getMovie = void 0;
const movieRepository_1 = __importDefault(require("../repositories/movieRepository"));
// GET /movies/:id
function getMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const movieId = req.params.id;
        try {
            const movies = yield movieRepository_1.default.getMovieById(movieId);
            res.json(movies);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.getMovie = getMovie;
// GET /movies
function getAllMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get query parameters for filtering and sorting
        const genre = req.query.genre;
        const title = req.query.title;
        const plot = req.query.plot;
        const sortBy = req.query.sortBy;
        try {
            const movies = yield movieRepository_1.default.getMovieFiltered(title, genre, plot, sortBy);
            res.json(movies);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.getAllMovies = getAllMovies;
// POST /movies
function createMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a new movie using the request body
        // Example: const newMovie = await Movie.create(req.body);
        res.send('New Movie created');
    });
}
exports.createMovie = createMovie;
//# sourceMappingURL=movieController.js.map