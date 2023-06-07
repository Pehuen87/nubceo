import express from "express";
import { generateDB } from "../helpers/mock";

export const getTvShow = (req: express.Request, res: express.Response) => {
    const { id } = req.params;
  
    //TODO
    const db = generateDB();

    const tvShow = db.tvshows.find((show) => show.id === id);
  
    if (!tvShow) {
      return res.status(404).json({ error: 'TV show not found' });
    }
  
    res.json(tvShow);
  }

