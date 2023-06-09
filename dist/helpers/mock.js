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
const directorModel_1 = __importDefault(require("../models/directorModel"));
const actorModel_1 = __importDefault(require("../models/actorModel"));
const movieModel_1 = __importDefault(require("../models/movieModel"));
const tvShowModel_1 = __importDefault(require("../models/tvShowModel"));
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
    const show = new tvShowModel_1.default({
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
    const aMovie = new movieModel_1.default({
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
    const aDirector = new directorModel_1.default({
        name: faker_1.default.name.firstName(),
        surname: faker_1.default.name.lastName(),
        bio: faker_1.default.lorem.paragraph(),
        avatar: faker_1.default.image.avatar(),
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
    const anActor = new actorModel_1.default({
        name: faker_1.default.name.firstName(),
        surname: faker_1.default.name.lastName(),
        bio: faker_1.default.lorem.paragraph(),
        avatar: faker_1.default.image.avatar(),
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
        const movies = yield movieModel_1.default.find(), actors = yield actorModel_1.default.find(), directors = yield directorModel_1.default.find(), tvshows = yield tvShowModel_1.default.find();
        movies.forEach((movie) => __awaiter(this, void 0, void 0, function* () {
            const selectedActors = getRandoms(actors, 10);
            const selectedDirector = getRandoms(directors, 1)[0];
            movie.actors = selectedActors.map((a) => a._id);
            movie.director = selectedDirector._id;
            movie.save();
        }));
        tvshows.forEach((tvshow) => __awaiter(this, void 0, void 0, function* () {
            const selectedActors = getRandoms(actors, 10);
            tvshow.actors = selectedActors.map((a) => a._id);
            tvshow.episodes.forEach((episode) => {
                const selectedDirector = getRandoms(directors, 1)[0];
                episode.director = selectedDirector._id;
            });
            tvshow.save();
        }));
        return;
    });
}
function generateDB() {
    return __awaiter(this, void 0, void 0, function* () {
        /*
          //GENERATE MOCK MOVIES
          generateMovies(faker.datatype.number({ min: 3, max: 20 }));
        
          //GENERATE MOCK TVSHOWS
          generateTVShows(faker.datatype.number({ min: 10, max: 40 }));
        
          //GENERATE MOCK ACTORS
          generateActors(faker.datatype.number({ min: 3, max: 50 }));
        
          //GENERATE MOCK DIRECTORS
          generateDirectors(faker.datatype.number({ min: 3, max: 20 }));
        
          //PICK ACTORS AND DIRECTORS FOR EACH TVSERIES AND MOVIE
          await pickActorsAndDirector();
        */
        console.log("MOCK DATABASE GENERATED");
    });
}
exports.generateDB = generateDB;
//# sourceMappingURL=mock.js.map