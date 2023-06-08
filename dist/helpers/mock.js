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
    director: null,
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
const generateTVShow = () => {
    const show = new tvShowModel_1.TVShow({
        title: faker_1.default.lorem.words(3),
        genre: faker_1.default.random.word(),
        seasons: faker_1.default.datatype.number({ min: 1, max: 10 }),
        plot: faker_1.default.lorem.paragraph(),
        episodes: generateEpisodes(faker_1.default.datatype.number({ min: 1, max: 20 })),
        actors: [],
    });
    show.save();
    return show;
};
// Generate an array of mock TV shows
const generateTVShows = (count) => {
    const tvShows = [];
    for (let i = 0; i < count; i++) {
        tvShows.push(generateTVShow());
    }
    return tvShows;
};
// Generate a mock Movie
const generateMovie = () => {
    const aMovie = new movieModel_1.Movie({
        title: faker_1.default.lorem.words(3),
        genre: faker_1.default.random.word(),
        director: null,
        plot: faker_1.default.lorem.paragraph(),
        actors: [],
    });
    aMovie.save();
    return aMovie;
};
// Generate an array of mock movies
const generateMovies = (count) => {
    const movies = [];
    for (let i = 0; i < count; i++) {
        movies.push(generateMovie());
    }
    return movies;
};
// Generate a mock Director
const generateDirector = () => {
    const aDirector = new directorModel_1.Director({
        name: faker_1.default.name.firstName(),
        surname: faker_1.default.name.lastName(),
        bio: faker_1.default.lorem.paragraph(),
        avatar: faker_1.default.image.avatar(),
        movies: [],
        tvShowEpisodes: [],
    });
    aDirector.save();
    return aDirector;
};
// Generate an array of mock directors
const generateDirectors = (count) => {
    const directors = [];
    for (let i = 0; i < count; i++) {
        directors.push(generateDirector());
    }
    return directors;
};
// Generate a mock Actor
const generateActor = () => {
    const anActor = new actorModel_1.Actor({
        name: faker_1.default.name.firstName(),
        surname: faker_1.default.name.lastName(),
        bio: faker_1.default.lorem.paragraph(),
        avatar: faker_1.default.image.avatar(),
        movies: [],
        tvShowEpisodes: [],
    });
    anActor.save();
    return anActor._id;
};
// Generate an array of mock actors
const generateActors = (count) => {
    const actors = [];
    for (let i = 0; i < count; i++) {
        actors.push(generateActor());
    }
    return actors;
};
const getRandoms = (arr, q) => {
    let len = Math.min(q, arr.length), n = faker_1.default.datatype.number({ min: 1, max: len });
    const result = new Array(n), taken = new Array(len);
    while (n--) {
        const x = faker_1.default.datatype.number({ min: 0, max: len - 1 });
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};
function updateActors(arr, _id) {
    return __awaiter(this, void 0, void 0, function* () {
        const actorUpdates = arr.map((actor) => {
            actor.movies.push(_id);
            return actor.save();
        });
        yield Promise.all([...actorUpdates]);
    });
}
function pickActorsAndDirector() {
    return __awaiter(this, void 0, void 0, function* () {
        const [movies, actors, directors, tvshows] = yield Promise.all([
            movieModel_1.Movie.find(),
            actorModel_1.Actor.find(),
            directorModel_1.Director.find(),
            tvShowModel_1.TVShow.find()
        ]);
        const movieUpdates = movies.map((movie) => __awaiter(this, void 0, void 0, function* () {
            const selectedActors = getRandoms(actors, 10);
            const selectedDirector = getRandoms(directors, 1)[0];
            const actorUpdates = selectedActors.map((actor) => __awaiter(this, void 0, void 0, function* () {
                actor.movies.push(movie._id);
                yield actor.save();
            }));
            selectedDirector.movies.push(movie._id);
            yield Promise.allSettled([...actorUpdates, selectedDirector.save()]);
            movie.actors = selectedActors.map((a) => a._id);
            movie.director = selectedDirector._id;
            return movie.save();
        }));
        yield Promise.allSettled(movieUpdates);
        const tvshowUpdates = tvshows.map((tvshow) => __awaiter(this, void 0, void 0, function* () {
            const selectedActors = getRandoms(actors, 10);
            const episodeUpdates = [];
            selectedActors.forEach((actor) => {
                actor.tvShowEpisodes.push(tvshow._id);
                episodeUpdates.push(actor.save());
            });
            tvshow.actors = selectedActors.map((a) => a._id);
            tvshow.episodes.forEach((episode) => {
                const selectedDirector = getRandoms(directors, 1)[0];
                episode.director = selectedDirector._id;
                selectedDirector.tvShowEpisodes.push(tvshow._id);
                episodeUpdates.push(selectedDirector.save());
            });
            episodeUpdates.push(tvshow.save());
            yield Promise.allSettled(episodeUpdates);
        }));
        yield Promise.allSettled(tvshowUpdates);
    });
}
function generateDB() {
    return __awaiter(this, void 0, void 0, function* () {
        generateMovies(faker_1.default.datatype.number({ min: 3, max: 20 }));
        generateTVShows(faker_1.default.datatype.number({ min: 10, max: 40 }));
        generateActors(faker_1.default.datatype.number({ min: 3, max: 50 }));
        generateDirectors(faker_1.default.datatype.number({ min: 3, max: 20 }));
        pickActorsAndDirector();
    });
}
exports.generateDB = generateDB;
//# sourceMappingURL=mock.js.map