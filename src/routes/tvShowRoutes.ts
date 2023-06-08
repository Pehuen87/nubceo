import express from 'express';
import { getTvShow, getAllTvShows, createTvShow } from '../controllers/tvShowController';

const tvShowRouter = express.Router();

// GET /tvshows/:id
tvShowRouter.get('/', getAllTvShows);


// GET /tvshows/:id
tvShowRouter.get('/:id', getTvShow);

// POST /tvshows
tvShowRouter.post('/', createTvShow);

export default tvShowRouter;
