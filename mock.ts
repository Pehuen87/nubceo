import faker from 'faker';
import { TVShow , ITVShow } from './src/models/tvshow';
import { Director, IDirector } from './src/models/director';
import { Actor , IActor } from './src/models/actor';
import { Movie, IMovie } from './src/models/movie'

// Generate a mock episode
const generateEpisode = () => ({
  id: faker.random.uuid(),
  title: faker.lorem.words(3),
  director: generateDirector(),
  season: faker.random.number({ min: 1, max: 10 }),
});

// Generate an array of mock episodes
const generateEpisodes = (count: number) => {
  const episodes = [];
  for (let i = 0; i < count; i++) {
    episodes.push(generateEpisode());
  }
  return episodes;
};

// Generate a mock TV show
const generateTVShow = (): ITVShow => new TVShow({
  title: faker.lorem.words(3),
  genre: faker.random.word(),
  seasons: faker.random.number({ min: 1, max: 10 }),
  plot: faker.lorem.paragraph(),
  episodes: generateEpisodes(faker.random.number({ min: 1, max: 20 })),
  actors: [generateActors(4)],
});

// Generate an array of mock TV shows
const generateTVShows = (count: number) => {
  const tvShows = [];
  for (let i = 0; i < count; i++) {
    tvShows.push(generateTVShow());
  }
  return tvShows;
};

// Generate a mock Movie
const generateMovie = (): IMovie => new Movie({
  title: faker.lorem.words(3),
  genre: faker.random.word(),
  director: generateDirector(),
  plot: faker.lorem.paragraph(),
  actors: [generateActors(4)],
});

// Generate an array of mock movies
const generateMovies = (count: number) => {
  const movies = [];
  for (let i = 0; i < count; i++) {
    movies.push(generateTVShow());
  }
  return movies;
};

// Generate a mock Director
const generateDirector = (): IDirector => new Director({
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
  bio: faker.lorem.paragraph(),
  avatar: faker.image.avatar(),
  movies: [],
  tvShowEpisodes: [],
});

// Generate an array of mock directors
const generateDirectors = (count: number) => {
  const directors = [];
  for (let i = 0; i < count; i++) {
    directors.push(generateDirector());
  }
  return directors;
};

// Generate a mock Actor
const generateActor = (): IActor => new Actor({
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
  bio: faker.lorem.paragraph(),
  avatar: faker.image.avatar(),
  movies: [],
  tvShowEpisodes: [],
});

// Generate an array of mock actors
const generateActors = (count: number) => {
  const actors = [];
  for (let i = 0; i < count; i++) {
    actors.push(generateActor());
  }
  return actors;
};
