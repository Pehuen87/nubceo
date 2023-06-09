import { Request, Response } from 'express';
import movieRepository from '../repositories/movieRepository';

// GET /movies/:id
async function getMovie(req: Request, res: Response) {
  const movieId = req.params.id;
  try {
    const movies = await movieRepository.getMovieById(movieId);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET /movies
async function getAllMovies(req: Request, res: Response) {
  // Get query parameters for filtering and sorting
  const genre = req.query.genre as string;
  const title = req.query.title as string;
  const plot = req.query.plot as string;
  const sortBy = req.query.sortBy as string;
  try {
    const movies = await movieRepository.getMovieFiltered(title, genre, plot, sortBy);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// POST /movies
async function createMovie(req: Request, res: Response) {
  // Create a new movie using the request body
  // Example: const newMovie = await Movie.create(req.body);
  res.send('New Movie created');
}

export { getMovie, getAllMovies, createMovie };