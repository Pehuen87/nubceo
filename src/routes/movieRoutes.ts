import express from 'express';
import { getMovie, getAllMovies, createMovie } from '../controllers/movieController';

const movieRouter = express.Router();

// GET /movies/
movieRouter.get('/', getAllMovies);

// GET /movies/:id
movieRouter.get('/:id', getMovie);

// POST /movies
movieRouter.post('/', createMovie);

export default movieRouter;