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
const movieModel_1 = __importDefault(require("../models/movieModel"));
class MovieRepository {
    getAllMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield movieModel_1.default.find().populate('actors').populate('director');
                return movies;
            }
            catch (error) {
                console.log(error.message);
                throw new Error('Error retrieving Movies');
            }
        });
    }
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield movieModel_1.default.findById(id).populate('actors').populate('director');
                return movie;
            }
            catch (error) {
                throw new Error('Error retrieving Movie');
            }
        });
    }
    getMovieFiltered(title, genre, plot, sortBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = movieModel_1.default.find().populate('actors').populate('director');
                // Apply filters
                if (title) {
                    query.where('title').regex(new RegExp(title, 'i'));
                }
                if (genre) {
                    query.where('genre').equals(genre);
                }
                if (plot) {
                    query.where('plot').equals(plot);
                }
                // Apply sorting
                if (sortBy) {
                    const sortField = sortBy.substring(1); // Remove the '-' prefix from the sort field
                    const sortOrder = sortBy.startsWith('-') ? -1 : 1; // -1 for descending, 1 for ascending
                    query.sort({ [sortField]: sortOrder });
                }
                // Execute the query and return the result
                const movies = yield query.exec();
                return movies;
            }
            catch (error) {
                console.log(error.message);
                throw new Error('Error retrieving movies');
            }
        });
    }
    createMovie(movieData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield movieModel_1.default.create(movieData);
                return movie;
            }
            catch (error) {
                throw new Error('Error creating Movie');
            }
        });
    }
}
exports.default = new MovieRepository();
//# sourceMappingURL=movieRepository.js.map