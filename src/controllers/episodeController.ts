import { Request, Response } from 'express';
import tvShowRepository from '../repositories/tvShowRepository'

// GET /tvshows/:id/episodes
async function getAllEpisodes(req: Request, res: Response) {
  const tvShowId = req.params.id;
  try {
    const episode = await tvShowRepository.getAllEpisodes(tvShowId);
    res.json(episode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET /tvshows/:id/episodes/:episodeId
async function getEpisode(req: Request, res: Response) {
  const tvShowId = req.params.id;
  const episodeId = req.params.episodeId;
  try {
    const episode = await tvShowRepository.getEpisodebyId(tvShowId, episodeId);
    res.json(episode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// POST /tvshows/:id/episodes
function createEpisode(req: Request, res: Response) {
  const tvShowId = req.params.id;
  // Create a new episode using the TV show ID and request body
  // Example: const newEpisode = await Episode.create({ tvShowId, ...req.body });
  res.send(`New episode created for TV Show ID: ${tvShowId}`);
}

export { getEpisode, getAllEpisodes, createEpisode };