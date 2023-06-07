"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateActors = exports.generateActor = exports.generateDirectors = exports.generateDirector = exports.generateMovies = exports.generateMovie = exports.generateTVShows = exports.generateTVShow = exports.generateEpisodes = exports.generateEpisode = void 0;
const faker_1 = __importDefault(require("faker"));
const tvshow_1 = require("../models/tvshow");
const director_1 = require("../models/director");
const actor_1 = require("../models/actor");
const movie_1 = require("../models/movie");
// Generate a mock episode
const generateEpisode = () => ({
    id: faker_1.default.datatype.uuid(),
    title: faker_1.default.lorem.words(3),
    director: (0, exports.generateDirector)(),
    season: faker_1.default.datatype.number({ min: 1, max: 10 }),
});
exports.generateEpisode = generateEpisode;
// Generate an array of mock episodes
const generateEpisodes = (count) => {
    const episodes = [];
    for (let i = 0; i < count; i++) {
        episodes.push((0, exports.generateEpisode)());
    }
    return episodes;
};
exports.generateEpisodes = generateEpisodes;
// Generate a mock TV show
const generateTVShow = () => new tvshow_1.TVShow({
    title: faker_1.default.lorem.words(3),
    genre: faker_1.default.random.word(),
    seasons: faker_1.default.datatype.number({ min: 1, max: 10 }),
    plot: faker_1.default.lorem.paragraph(),
    episodes: (0, exports.generateEpisodes)(faker_1.default.datatype.number({ min: 1, max: 20 })),
    actors: [(0, exports.generateActors)(4)],
});
exports.generateTVShow = generateTVShow;
// Generate an array of mock TV shows
const generateTVShows = (count) => {
    const tvShows = [];
    for (let i = 0; i < count; i++) {
        tvShows.push((0, exports.generateTVShow)());
    }
    return tvShows;
};
exports.generateTVShows = generateTVShows;
// Generate a mock Movie
const generateMovie = () => new movie_1.Movie({
    title: faker_1.default.lorem.words(3),
    genre: faker_1.default.random.word(),
    director: (0, exports.generateDirector)(),
    plot: faker_1.default.lorem.paragraph(),
    actors: [(0, exports.generateActors)(4)],
});
exports.generateMovie = generateMovie;
// Generate an array of mock movies
const generateMovies = (count) => {
    const movies = [];
    for (let i = 0; i < count; i++) {
        movies.push((0, exports.generateMovie)());
    }
    return movies;
};
exports.generateMovies = generateMovies;
// Generate a mock Director
const generateDirector = () => new director_1.Director({
    name: faker_1.default.name.firstName(),
    surname: faker_1.default.name.lastName(),
    bio: faker_1.default.lorem.paragraph(),
    avatar: faker_1.default.image.avatar(),
    movies: [],
    tvShowEpisodes: [],
});
exports.generateDirector = generateDirector;
// Generate an array of mock directors
const generateDirectors = (count) => {
    const directors = [];
    for (let i = 0; i < count; i++) {
        directors.push((0, exports.generateDirector)()._id);
    }
    return directors;
};
exports.generateDirectors = generateDirectors;
// Generate a mock Actor
const generateActor = () => new actor_1.Actor({
    name: faker_1.default.name.firstName(),
    surname: faker_1.default.name.lastName(),
    bio: faker_1.default.lorem.paragraph(),
    avatar: faker_1.default.image.avatar(),
    movies: [],
    tvShowEpisodes: [],
});
exports.generateActor = generateActor;
// Generate an array of mock actors
const generateActors = (count) => {
    const actors = [];
    for (let i = 0; i < count; i++) {
        actors.push((0, exports.generateActor)());
    }
    return actors;
};
exports.generateActors = generateActors;
const generateDB = () => {
    const mockDB = {
        movies: (0, exports.generateMovies)(faker_1.default.datatype.number({ min: 1, max: 10 })),
        tvshows: (0, exports.generateTVShows)(faker_1.default.datatype.number({ min: 1, max: 10 })),
        actors: (0, exports.generateActors)(faker_1.default.datatype.number({ min: 1, max: 10 })),
        directors: (0, exports.generateDirectors)(faker_1.default.datatype.number({ min: 1, max: 10 }))
    };
    return mockDB;
};
//# sourceMappingURL=mock.js.map