import express from 'express';
import { getTvShow, getAllTvShows, createTvShow } from '../controllers/tvShowController';
import { getEpisode } from '../controllers/episodeController';

const tvShowRouter = express.Router();

// GET /tvshows/:id
tvShowRouter.get('/', getAllTvShows);

// GET /tvshows/:id
tvShowRouter.get('/:id', getTvShow);

// GET /tvshows/:id/episode/:episodeId
tvShowRouter.get('/:id/episode/:episodeId', getEpisode);

// POST /tvshows
tvShowRouter.post('/', createTvShow);

export default tvShowRouter;
