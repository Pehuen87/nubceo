// Import necessary modules and dependencies
import express from "express";
import { authenticateToken, generateAccessToken, authenticateRefreshToken, generateRefreshToken } from './auth'; // Functions for JWT authentication
import { Actor, IActor } from "./models/actor";
import { Director, IDirector } from "./models/director";
import { Movie, IMovie} from "./models/movie";
import { TVShow, ITVShow } from "./models/tvshow";

// Create an instance of Express.js
const app = express();

// Define middleware for parsing JSON data
app.use(express.json());


// Define sample data
const actor1 = new Actor({
    name: 'Name1',
    surname: 'Surname1',
    bio: 'This is a bio1',
    avatar: 'http://google.com/img1.jpg',
    movies: [],
    tvShowEpisodes: []
});

const actor2 = new Actor({
    name: 'Name2',
    surname: 'Surname2',
    bio: 'This is a bio2',
    avatar: 'http://google.com/img2.jpg',
    movies: [],
    tvShowEpisodes: []
});

const director1 = new Director({
    name: 'Name1',
    surname: 'Surname1',
    bio: 'This is a bio1',
    avatar: 'http://google.com/img1.jpg',
    movies: [],
    tvShowEpisodes: []
});

const director2 = new Director({
    name: 'Name2',
    surname: 'Surname2',
    bio: 'This is a bio2',
    avatar: 'http://google.com/img2.jpg',
    movies: [],
    tvShowEpisodes: []
});


const tvShows =  new TVShow({
    title: 'TV Show 1',
    genre: 'Drama',
    seasons: 3,
    episodes: [
      { id: '1', title: 'Episode 1', director: 'Director 1', season: 1 },
      { id: '2', title: 'Episode 2', director: 'Director 3', season: 2},
    ],
    actors: ['Actor 1', 'Actor 3'],
});

const actors: IActor[] = [
  { id: '1', name: 'Actor 1', movies: ['Movie 1'], tvShows: ['TV Show 1'] },
  { id: '2', name: 'Actor 2', movies: ['Movie 1'], tvShows: [] },
  { id: '3', name: 'Actor 3', movies: [], tvShows: ['TV Show 1'] },
];

const directors: IDirector[] = [
  { id: '1', name: 'Director 1', movies: ['Movie 1'], tvShowEpisodes: ['Episode 1'] },
  { id: '2', name: 'Director 2', movies: ['Movie 2'], tvShowEpisodes: [] },
  { id: '3', name: 'Director 3', movies: [], tvShowEpisodes: ['Episode 2'] },
];

// Define API endpoints

// Authentication using JWT
app.post('/auth/login', (req: express.Request, res: express.Response) => {
  // Perform authentication logic (e.g., validate username and password)
  const { username, password } = req.body;

  // Generate and return access token and refresh token upon successful authentication
  const accessToken = generateAccessToken(username);
  const refreshToken = generateRefreshToken(username);

  res.json({ accessToken, refreshToken });
});

// Refresh JWT access token
app.post('/auth/token', authenticateRefreshToken, (req: express.Request, res: express.Response) => {
  // Generate and return new access token
  const { username, password } = req.body;
  const accessToken = generateAccessToken(username);

  res.json({ accessToken });
});

// Retrieve movies with filtering and sorting
app.get('/movies', authenticateToken, (req: express.Request, res: express.Response) => {
  // Get query parameters for filtering and sorting
  const genre = req.query.genre as string;
  const sortBy = req.query.sortBy as string;
  

  let filteredMovies = [...movies];

  // Filter movies by genre if provided
  if (genre) {
    filteredMovies = filteredMovies.filter((movie) => movie.genre.toLowerCase() === genre.toLowerCase());
  }

  // Sort movies by the specified field if provided
  if (!isNaN(parseInt(sortBy))) {
    const sortByNumber = parseInt(sortBy); 
    filteredMovies.sort((a, b) => a[sortByNumber].localeCompare(b[sortByNumber]));
  }

  res.json(filteredMovies);
});

// Retrieve information of a specific TV show episode
app.get('/tvshows/:id/episodes/:episodeId', authenticateToken, (req: express.Request, res: express.Response) => {
  const { id, episodeId } = req.params;

  // Find the TV show by ID
  const tvShow = tvShows.find((show) => show.id === id);

  if (!tvShow) {
    return res.status(404).json({ error: 'TV show not found' });
  }

  // Find the episode by ID
  const episode = tvShow.episodes.find((ep) => ep.id === episodeId);

  if (!episode) {
    return res.status(404).json({ error: 'Episode not found' });
  }

  // Find the director of the episode
  const director = directors.find((dir) => dir.name === episode.director);

  if (!director) {
    return res.status(404).json({ error: 'Director not found' });
  }

  const episodeWithDirector = { ...episode, director: director.name };

  res.json(episodeWithDirector);
});

// Add a new object (e.g., movie, TV show, actor, director)
app.post('/objects', authenticateToken, (req: express.Request, res: express.Response) => {
  const { type, object } = req.body;

  // Perform validation and add the object to the appropriate array (e.g., movies, tvShows, actors, directors)

  res.json({ success: true });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
