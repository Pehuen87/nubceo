import express from 'express';
import { getEpisode, getAllEpisodes, createEpisode } from '../controllers/episodeController';

const episodeRouter = express.Router({ mergeParams: true });

// GET /tvshows/:id/episodes/
episodeRouter.get('', getAllEpisodes);

// GET /tvshows/:id/episodes/:episodeid
episodeRouter.get('/:episodeid', getEpisode);

// POST /tvshows/:id/episodes
episodeRouter.post('/', createEpisode);

export default episodeRouter;