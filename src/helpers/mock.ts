import faker from 'faker';
import { Director, IDirector } from '../models/directorModel';
import { Actor } from '../models/actorModel';
import { Movie, IMovie } from '../models/movieModel'
import { TVShow, ITVShow } from '../models/tvShowModel';




// Generate a mock episode
const generateEpisode = () => ({
  episodeId: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  director: null,
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
const generateTVShow = (): ITVShow => {
  const show = new TVShow({
    title: faker.lorem.words(3),
    genre: faker.random.word(),
    seasons: faker.datatype.number({ min: 1, max: 10 }),
    plot: faker.lorem.paragraph(),
    episodes: generateEpisodes(faker.datatype.number({ min: 1, max: 20 })),
    actors: [],
  });
  show.save();
  return show;
}

// Generate an array of mock TV shows
const generateTVShows = (count: number) => {
  const tvShows = [];
  for (let i = 0; i < count; i++) {
    tvShows.push(generateTVShow());
  }
  return tvShows;
};

// Generate a mock Movie
const generateMovie = (): IMovie =>{
  const aMovie = new Movie({
    title: faker.lorem.words(3),
    genre: faker.random.word(),
    director: null,
    plot: faker.lorem.paragraph(),
    actors: [],
  });
  aMovie.save();
  return aMovie;
}

// Generate an array of mock movies
const generateMovies = (count: number) => {
  const movies = [];
  for (let i = 0; i < count; i++) {
    movies.push(generateMovie());
  }
  return movies;
};

// Generate a mock Director
const generateDirector = (): IDirector => {
  const aDirector = new Director({
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    bio: faker.lorem.paragraph(),
    avatar: faker.image.avatar(),
    movies: [],
    tvShowEpisodes: [],
  });

  aDirector.save();
  return aDirector;
}

// Generate an array of mock directors
const generateDirectors = (count: number) => {
  const directors : IDirector[] = [];
  for (let i = 0; i < count; i++) {
    directors.push(generateDirector());
  }
  return directors;
};

// Generate a mock Actor
const generateActor = () => {
  const anActor = new Actor({
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    bio: faker.lorem.paragraph(),
    avatar: faker.image.avatar(),
    movies: [],
    tvShowEpisodes: [],
  });
  anActor.save();
  return anActor._id;
}

// Generate an array of mock actors
const generateActors = (count: number) => {
  const actors = [];
  for (let i = 0; i < count; i++) {
    actors.push(generateActor());
  }
  return actors;
};


const getRandoms = (arr , q) => {
  
  let   len = Math.min(q, arr.length), 
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

async function updateActors(arr, _id){
  const actorUpdates = arr.map((actor) => {
    actor.movies.push(_id);
    return actor.save();
  });


  await Promise.all([...actorUpdates]);
}
async function pickActorsAndDirector() {
  const [movies, actors, directors, tvshows] = await Promise.all([
    Movie.find(),
    Actor.find(),
    Director.find(),
    TVShow.find()
  ]);

  const movieUpdates = movies.map(async (movie) => {
    const selectedActors = getRandoms(actors, 10);
    const selectedDirector = getRandoms(directors, 1)[0];

    const actorUpdates = selectedActors.map(async (actor) => {
      actor.movies.push(movie._id);
      await actor.save();
    });

    selectedDirector.movies.push(movie._id);

    await Promise.allSettled([...actorUpdates, selectedDirector.save()]);

    movie.actors = selectedActors.map((a) => a._id);
    movie.director = selectedDirector._id;
    return movie.save();
  });

  await Promise.allSettled(movieUpdates);

  const tvshowUpdates = tvshows.map(async (tvshow) => {
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

    await Promise.allSettled(episodeUpdates);
  });

  await Promise.allSettled(tvshowUpdates);
}


export interface Idb { movies, tvshows, actors, directors }

export async function generateDB (){

  generateMovies(faker.datatype.number({ min: 3, max: 20 }));
  generateTVShows(faker.datatype.number({ min: 10, max: 40 }));
  generateActors(faker.datatype.number({ min: 3, max: 50 }));
  generateDirectors(faker.datatype.number({ min: 3, max: 20 }));
  

  pickActorsAndDirector();

  
}
    








