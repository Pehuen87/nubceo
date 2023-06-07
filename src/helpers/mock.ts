import faker from 'faker';
import { Director, IDirector } from '../models/directorModel';
import { Actor, IActor } from '../models/actorModel';
import { Movie, IMovie } from '../models/movieModel'
import { TVShow, ITVShow } from '../models/tvShowModel';





// Generate a mock episode
const generateEpisode = () => ({
  episodeId: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  director: generateDirector(),
  season: faker.datatype.number({ min: 1, max: 10 }),
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
  seasons: faker.datatype.number({ min: 1, max: 10 }),
  plot: faker.lorem.paragraph(),
  episodes: generateEpisodes(faker.datatype.number({ min: 1, max: 20 })),
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
    movies.push(generateMovie());
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

export interface Idb { movies: IMovie[], tvshows: ITVShow[], actors: IActor[], directors: IDirector[] }

const getRandomsActors = (arr : IActor[]) => {
  
  let   len = arr.length,
        n = faker.datatype.number({ min: 1, max: len});
  const result = new Array(n),
        taken = new Array(len);
  while (n--) {
      const x = faker.datatype.number({ min: 0, max: len-1});
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}


const pickActorsAndDirector = (db : Idb) => {

  db.movies.forEach(movie => {
    const selectedActors : IActor[]= getRandomsActors(db.actors);
    const selectedDirector : IDirector = db.directors[faker.datatype.number({ min: 0, max: db.directors.length-1})];
    selectedActors.forEach(actor => {
      actor.movies.push(movie._id);
    });
    selectedDirector.movies.push(movie._id);

    movie.actors = selectedActors.map( a => a._id);
    movie.director = selectedDirector._id;
  });

  db.tvshows.forEach(tvshow => {
    const selectedActors : IActor[]= getRandomsActors(db.actors);
    
    selectedActors.forEach(actor => {
      actor.tvShowEpisodes.push(tvshow._id);
    });

    tvshow.actors = selectedActors.map( a => a._id);
    
    tvshow.episodes.forEach(episode => {
      const selectedDirector : IDirector = db.directors[faker.datatype.number({ min: 0, max: db.directors.length-1})];
      episode.director = selectedDirector._id;
      selectedDirector.tvShowEpisodes.push(tvshow._id);
    });
  });


}


export const generateDB = (): Idb => {

  const mockDB: Idb = {
    movies: generateMovies(faker.datatype.number({ min: 3, max: 20 })),
    tvshows: generateTVShows(faker.datatype.number({ min: 3, max: 20 })),
    actors: generateActors(faker.datatype.number({ min: 3, max: 20 })),
    directors: generateDirectors(faker.datatype.number({ min: 3, max: 20 }))
  };

  pickActorsAndDirector(mockDB);


  return mockDB;


}



