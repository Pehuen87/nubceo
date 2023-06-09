import { Request, Response } from 'express';
import tvShowRepository from '../repositories/tvShowRepository'

// GET /tvshows
async function getAllTvShows(req: Request, res: Response) {
  try {
    const tvShows = await tvShowRepository.getAllTVShows();
    res.json(tvShows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET /tvshows/:id
async function getTvShow(req: Request, res: Response) {
  const tvShowId = req.params.id;
  try {
    const tvShows = await tvShowRepository.getTVShowById(tvShowId);
    res.json(tvShows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



// POST /tvshows
async function createTvShow(req: Request, res: Response) {
  try {

  
    // Save the TV show using the repository
    const createdTvShow = await tvShowRepository.createTVShow(req.body);

    res.json(createdTvShow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
  

export { getTvShow, getAllTvShows, createTvShow };