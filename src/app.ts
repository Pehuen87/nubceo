// Import necessary modules and dependencies
import express from "express";
import { authenticateToken, generateAccessToken, authenticateRefreshToken, generateRefreshToken } from './auth'; // Functions for JWT authentication
import { Actor, IActor } from "./models/actor";
import { Director, IDirector } from "./models/director";
import { Movie, IMovie } from "./models/movie";
import { TVShow, ITVShow } from "./models/tvshow";
import * as mock from './helpers/mock';

// Create an instance of Express.js
const app = express();

// Define middleware for parsing JSON data
app.use(express.json());


// Define sample data with mock 
const movies = mock.generateMovies(5);
const tvShows = mock.generateTVShows(4);
const directors = mock.generateDirectors(3);
const actors = mock.generateActors(3);

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
  filteredMovies.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));


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
