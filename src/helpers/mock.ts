import faker from 'faker';
import { TVShow, ITVShow } from '../models/tvshow';
import { Director, IDirector } from '../models/director';
import { Actor, IActor } from '../models/actor';
import { Movie, IMovie } from '../models/movie'





// Generate a mock episode
export const generateEpisode = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  director: generateDirector(),
  season: faker.datatype.number({ min: 1, max: 10 }),
});

// Generate an array of mock episodes
export const generateEpisodes = (count: number) => {
  const episodes = [];
  for (let i = 0; i < count; i++) {
    episodes.push(generateEpisode());
  }
  return episodes;
};

// Generate a mock TV show
export const generateTVShow = (): ITVShow => new TVShow({
  title: faker.lorem.words(3),
  genre: faker.random.word(),
  seasons: faker.datatype.number({ min: 1, max: 10 }),
  plot: faker.lorem.paragraph(),
  episodes: generateEpisodes(faker.datatype.number({ min: 1, max: 20 })),
  actors: [generateActors(4)],
});

// Generate an array of mock TV shows
export const generateTVShows = (count: number) => {
  const tvShows = [];
  for (let i = 0; i < count; i++) {
    tvShows.push(generateTVShow());
  }
  return tvShows;
};

// Generate a mock Movie
export const generateMovie = (): IMovie => new Movie({
  title: faker.lorem.words(3),
  genre: faker.random.word(),
  director: generateDirector(),
  plot: faker.lorem.paragraph(),
  actors: [generateActors(4)],
});

// Generate an array of mock movies
export const generateMovies = (count: number) => {
  const movies = [];
  for (let i = 0; i < count; i++) {
    movies.push(generateMovie());
  }
  return movies;
};

// Generate a mock Director
export const generateDirector = (): IDirector => new Director({
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
  bio: faker.lorem.paragraph(),
  avatar: faker.image.avatar(),
  movies: [],
  tvShowEpisodes: [],
});

// Generate an array of mock directors
export const generateDirectors = (count: number) => {
  const directors = [];
  for (let i = 0; i < count; i++) {
    directors.push(generateDirector()._id);
  }
  return directors;
};

// Generate a mock Actor
export const generateActor = (): IActor => new Actor({
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
  bio: faker.lorem.paragraph(),
  avatar: faker.image.avatar(),
  movies: [],
  tvShowEpisodes: [],
});

// Generate an array of mock actors
export const generateActors = (count: number) => {
  const actors = [];
  for (let i = 0; i < count; i++) {
    actors.push(generateActor());
  }
  return actors;
};

interface Idb { movies: IMovie[], tvshows: ITVShow[], actors: IActor[], directors: IDirector[] }

const generateDB = (): Idb => {

  const mockDB: Idb = {
    movies: generateMovies(faker.datatype.number({ min: 1, max: 10 })),
    tvshows: generateTVShows(faker.datatype.number({ min: 1, max: 10 })),
    actors: generateActors(faker.datatype.number({ min: 1, max: 10 })),
    directors: generateDirectors(faker.datatype.number({ min: 1, max: 10 }))
  };


  return mockDB;


}



