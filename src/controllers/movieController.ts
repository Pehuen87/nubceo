import express from "express";
import { generateDB } from "../helpers/mock";

export const movies = (req: express.Request, res: express.Response) => {
    // Get query parameters for filtering and sorting
    const genre = req.query.genre as string;
    const title = req.query.title as string;
    const plot = req.query.plot as string;
    const sortBy = req.query.sortBy as string;
  
  
    let filteredMovies = [...generateDB().movies];
  
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