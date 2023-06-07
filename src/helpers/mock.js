"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateActors = exports.generateActor = exports.generateDirectors = exports.generateDirector = exports.generateMovies = exports.generateMovie = exports.generateTVShows = exports.generateTVShow = exports.generateEpisodes = exports.generateEpisode = void 0;
var faker_1 = require("faker");
var tvshow_1 = require("../models/tvshow");
var director_1 = require("../models/director");
var actor_1 = require("../models/actor");
var movie_1 = require("../models/movie");
// Generate a mock episode
var generateEpisode = function () { return ({
    id: faker_1.default.datatype.uuid(),
    title: faker_1.default.lorem.words(3),
    director: (0, exports.generateDirector)(),
    season: faker_1.default.datatype.number({ min: 1, max: 10 }),
}); };
exports.generateEpisode = generateEpisode;
// Generate an array of mock episodes
var generateEpisodes = function (count) {
    var episodes = [];
    for (var i = 0; i < count; i++) {
        episodes.push((0, exports.generateEpisode)());
    }
    return episodes;
};
exports.generateEpisodes = generateEpisodes;
// Generate a mock TV show
var generateTVShow = function () { return new tvshow_1.TVShow({
    title: faker_1.default.lorem.words(3),
    genre: faker_1.default.random.word(),
    seasons: faker_1.default.datatype.number({ min: 1, max: 10 }),
    plot: faker_1.default.lorem.paragraph(),
    episodes: (0, exports.generateEpisodes)(faker_1.default.datatype.number({ min: 1, max: 20 })),
    actors: [(0, exports.generateActors)(4)],
}); };
exports.generateTVShow = generateTVShow;
// Generate an array of mock TV shows
var generateTVShows = function (count) {
    var tvShows = [];
    for (var i = 0; i < count; i++) {
        tvShows.push((0, exports.generateTVShow)());
    }
    return tvShows;
};
exports.generateTVShows = generateTVShows;
// Generate a mock Movie
var generateMovie = function () { return new movie_1.Movie({
    title: faker_1.default.lorem.words(3),
    genre: faker_1.default.random.word(),
    director: (0, exports.generateDirector)(),
    plot: faker_1.default.lorem.paragraph(),
    actors: [(0, exports.generateActors)(4)],
}); };
exports.generateMovie = generateMovie;
// Generate an array of mock movies
var generateMovies = function (count) {
    var movies = [];
    for (var i = 0; i < count; i++) {
        movies.push((0, exports.generateMovie)());
    }
    return movies;
};
exports.generateMovies = generateMovies;
// Generate a mock Director
var generateDirector = function () { return new director_1.Director({
    name: faker_1.default.name.firstName(),
    surname: faker_1.default.name.lastName(),
    bio: faker_1.default.lorem.paragraph(),
    avatar: faker_1.default.image.avatar(),
    movies: [],
    tvShowEpisodes: [],
}); };
exports.generateDirector = generateDirector;
// Generate an array of mock directors
var generateDirectors = function (count) {
    var directors = [];
    for (var i = 0; i < count; i++) {
        directors.push((0, exports.generateDirector)()._id);
    }
    return directors;
};
exports.generateDirectors = generateDirectors;
// Generate a mock Actor
var generateActor = function () { return new actor_1.Actor({
    name: faker_1.default.name.firstName(),
    surname: faker_1.default.name.lastName(),
    bio: faker_1.default.lorem.paragraph(),
    avatar: faker_1.default.image.avatar(),
    movies: [],
    tvShowEpisodes: [],
}); };
exports.generateActor = generateActor;
// Generate an array of mock actors
var generateActors = function (count) {
    var actors = [];
    for (var i = 0; i < count; i++) {
        actors.push((0, exports.generateActor)());
    }
    return actors;
};
exports.generateActors = generateActors;
