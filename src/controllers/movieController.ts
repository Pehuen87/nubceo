import { Request, Response } from 'express';

// GET /movies/:id
function getMovie(req: Request, res: Response) {
  const movieId = req.params.id;
  // Retrieve Movie details using the ID
  // Example: const movie = await Movie.findById(MovieId);
  res.send(`Movie ID: ${movieId}`);
}

// GET /movies
function getAllMovies(req: Request, res: Response) {
  // Get query parameters for filtering and sorting
  const genre = req.query.genre as string;
  const title = req.query.title as string;
  const plot = req.query.plot as string;
  const sortBy = req.query.sortBy as string;


  let filteredMovies = [/*...db.movies*/];

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
}

// POST /movies
function createMovie(req: Request, res: Response) {
  // Create a new movie using the request body
  // Example: const newMovie = await Movie.create(req.body);
  res.send('New Movie created');
}

export { getMovie, getAllMovies, createMovie };