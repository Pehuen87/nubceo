import { Request, Response } from 'express';

// GET /tvshows/:id/episodes
function getAllEpisodes(req: Request, res: Response) {
  const tvShowId = req.params.id;
  // Retrieve all episodes by TV Show ID
  res.send(`TV Show ID: ${tvShowId}`);
}

// GET /tvshows/:id/episodes/:episodeid
function getEpisode(req: Request, res: Response) {
    const tvShowId = req.params.id;
    const episodeId = req.params.episodeid;
    // Retrieve episode details using the TV show ID and episode ID
    // Example: const episode = await Episode.findOne({ tvShowId, _id: episodeId });
    res.send(`TV Show ID: ${tvShowId}, Episode ID: ${episodeId}`);
}

// POST /tvshows/:id/episodes
function createEpisode(req: Request, res: Response) {
  const tvShowId = req.params.id;
  // Create a new episode using the TV show ID and request body
  // Example: const newEpisode = await Episode.create({ tvShowId, ...req.body });
  res.send(`New episode created for TV Show ID: ${tvShowId}`);
}

export { getEpisode, getAllEpisodes, createEpisode };