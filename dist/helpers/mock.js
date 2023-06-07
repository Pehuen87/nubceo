"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDB = void 0;
const faker_1 = __importDefault(require("faker"));
const directorModel_1 = require("../models/directorModel");
const actorModel_1 = require("../models/actorModel");
const movieModel_1 = require("../models/movieModel");
const tvShowModel_1 = require("../models/tvShowModel");
// Generate a mock episode
const generateEpisode = () => ({
    episodeId: faker_1.default.datatype.uuid(),
    title: faker_1.default.lorem.words(3),
    director: generateDirector(),
    season: faker_1.default.datatype.number({ min: 1, max: 10 }),
});
// Generate an array of mock episodes
const generateEpisodes = (count) => {
    const episodes = [];
    for (let i = 0; i < count; i++) {
        episodes.push(generateEpisode());
    }
    return episodes;
};
// Generate a mock TV show
const generateTVShow = () => new tvShowModel_1.TVShow({
    title: faker_1.default.lorem.words(3),
    genre: faker_1.default.random.word(),
    seasons: faker_1.default.datatype.number({ min: 1, max: 10 }),
    plot: faker_1.default.lorem.paragraph(),
    episodes: generateEpisodes(faker_1.default.datatype.number({ min: 1, max: 20 })),
    actors: [generateActors(4)],
});
// Generate an array of mock TV shows
const generateTVShows = (count) => {
    const tvShows = [];
    for (let i = 0; i < count; i++) {
        tvShows.push(generateTVShow());
    }
    return tvShows;
};
// Generate a mock Movie
const generateMovie = () => new movieModel_1.Movie({
    title: faker_1.default.lorem.words(3),
    genre: faker_1.default.random.word(),
    director: generateDirector(),
    plot: faker_1.default.lorem.paragraph(),
    actors: [generateActors(4)],
});
// Generate an array of mock movies
const generateMovies = (count) => {
    const movies = [];
    for (let i = 0; i < count; i++) {
        movies.push(generateMovie());
    }
    return movies;
};
// Generate a mock Director
const generateDirector = () => new directorModel_1.Director({
    name: faker_1.default.name.firstName(),
    surname: faker_1.default.name.lastName(),
    bio: faker_1.default.lorem.paragraph(),
    avatar: faker_1.default.image.avatar(),
    movies: [],
    tvShowEpisodes: [],
});
// Generate an array of mock directors
const generateDirectors = (count) => {
    const directors = [];
    for (let i = 0; i < count; i++) {
        directors.push(generateDirector());
    }
    return directors;
};
// Generate a mock Actor
const generateActor = () => new actorModel_1.Actor({
    name: faker_1.default.name.firstName(),
    surname: faker_1.default.name.lastName(),
    bio: faker_1.default.lorem.paragraph(),
    avatar: faker_1.default.image.avatar(),
    movies: [],
    tvShowEpisodes: [],
});
// Generate an array of mock actors
const generateActors = (count) => {
    const actors = [];
    for (let i = 0; i < count; i++) {
        actors.push(generateActor());
    }
    return actors;
};
const getRandomsActors = (arr) => {
    let len = arr.length, n = faker_1.default.datatype.number({ min: 1, max: len });
    const result = new Array(n), taken = new Array(len);
    while (n--) {
        const x = faker_1.default.datatype.number({ min: 0, max: len - 1 });
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};
const pickActorsAndDirector = (db) => {
    db.movies.forEach(movie => {
        const selectedActors = getRandomsActors(db.actors);
        const selectedDirector = db.directors[faker_1.default.datatype.number({ min: 0, max: db.directors.length - 1 })];
        selectedActors.forEach(actor => {
            actor.movies.push(movie._id);
        });
        selectedDirector.movies.push(movie._id);
        movie.actors = selectedActors.map(a => a._id);
        movie.director = selectedDirector._id;
    });
    db.tvshows.forEach(tvshow => {
        const selectedActors = getRandomsActors(db.actors);
        selectedActors.forEach(actor => {
            actor.tvShowEpisodes.push(tvshow._id);
        });
        tvshow.actors = selectedActors.map(a => a._id);
        tvshow.episodes.forEach(episode => {
            const selectedDirector = db.directors[faker_1.default.datatype.number({ min: 0, max: db.directors.length - 1 })];
            episode.director = selectedDirector._id;
            selectedDirector.tvShowEpisodes.push(tvshow._id);
        });
    });
};
const generateDB = () => {
    const mockDB = {
        movies: generateMovies(faker_1.default.datatype.number({ min: 3, max: 20 })),
        tvshows: generateTVShows(faker_1.default.datatype.number({ min: 3, max: 20 })),
        actors: generateActors(faker_1.default.datatype.number({ min: 3, max: 20 })),
        directors: generateDirectors(faker_1.default.datatype.number({ min: 3, max: 20 }))
    };
    pickActorsAndDirector(mockDB);
    return mockDB;
};
exports.generateDB = generateDB;
//# sourceMappingURL=mock.js.map