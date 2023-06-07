// Import necessary modules and dependencies
import express from "express";
import 'dotenv/config'
import { authenticateToken, generateAccessToken, authenticateRefreshToken, generateRefreshToken } from './middlewares/auth'; // Functions for JWT authentication
import * as mock from './helpers/mock';
import { connectToDatabase } from "./config/db";

// Create an instance of Express.js
const app = express();

// Connect to MongoDB
connectToDatabase();

// Define middleware for parsing JSON data
app.use(express.json());

// Define sample data with mock 
const db = mock.generateDB();


// Define API endpoints

// Authentication using JWT
app.post('/auth/login', (req: express.Request, res: express.Response) => {
  // Perform authentication logic TODO
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
  const title = req.query.title as string;
  const plot = req.query.plot as string;
  const sortBy = req.query.sortBy as string;


  let filteredMovies = [...db.movies];

  // Filter movies by genre if provided
  if (genre) {
    filteredMovies = filteredMovies.filter((movie) => movie.genre.toLowerCase() === genre.toLowerCase());
  }

  // Filter movies by title if provided
  if (title) {
    filteredMovies = filteredMovies.filter((movie) => movie.title.toLowerCase() === title.toLowerCase());
  }

  // Filter movies by plot if provided
  if (plot) {
    filteredMovies = filteredMovies.filter((movie) => movie.plot.toLowerCase() === plot.toLowerCase());
  }

  // Sort movies by the specified field if provided
  if(sortBy)
  filteredMovies.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));


  res.json(filteredMovies);
});

app.get('/actors', authenticateToken, (req: express.Request, res: express.Response) => {

  res.json(db.actors);
});

app.get('/directors', authenticateToken, (req: express.Request, res: express.Response) => {

  res.json(db.directors);
});


app.get('/tvshows', authenticateToken, (req: express.Request, res: express.Response) => {

  res.json(db.tvshows);
});

// Retrieve information of a specific TV show episode
app.get('/tvshows/:id/episodes/:episodeId', authenticateToken, (req: express.Request, res: express.Response) => {
  const { id, episodeId } = req.params;

  // Find the TV show by ID
  const tvShow = db.tvshows.find((show) => show.id === id);

  if (!tvShow) {
    return res.status(404).json({ error: 'TV show not found' });
  }

  // Find the episode by ID
  const episode = tvShow.episodes.find((ep) => ep.episodeId === episodeId);

  if (!episode) {
    return res.status(404).json({ error: 'Episode not found' });
  }

  // Find the director of the episode
  const director = db.directors.find((dir) => dir._id ===  episode.director);

  if (!director) {
    return res.status(404).json({ error: 'Director not found' });
  }

  const episodeWithDirector = { ...episode, director: director.name };

  res.json(episodeWithDirector);
});

// Retrieve information of a specific TV show episode
app.get('/tvshows/:id/episodes/', authenticateToken, (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  // Find the TV show by ID
  const tvShow = db.tvshows.find((show) => show.id === id);

  if (!tvShow) {
    return res.status(404).json({ error: 'TV show not found' });
  }

  res.json(tvShow.episodes);
});

// Add a new object (e.g., movie, TV show, actor, director)
app.post('/objects', authenticateToken, (req: express.Request, res: express.Response) => {
  const { type, object } = req.body;

  // Perform validation and add the object to the appropriate array (e.g., movies, tvShows, actors, directors)

  res.json({ success: true });
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
