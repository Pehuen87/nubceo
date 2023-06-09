import Actor from '../models/actorModel';
import Director from '../models/directorModel';
import Movie from '../models/movieModel';

class MovieRepository {

  async getAllMovies() {
    try {
      const movies = await Movie.find().populate('actors').populate('director');
      return movies;
    } catch (error) {

      console.log(error.message);
      throw new Error('Error retrieving Movies');
    }
  }

  async getMovieById(id: string) {
    try {
      const movie = await Movie.findById(id).populate('actors').populate('director');
      return movie;
    } catch (error) {
      throw new Error('Error retrieving Movie');
    }
  }

  async getMovieFiltered(title, genre, plot, sortBy) {
    try {
      const query = Movie.find().populate('actors').populate('director');

      // Apply filters
      if (title) {
        // Regex for lowcase comparisson
        query.where('title').regex(new RegExp(title, 'i'));
      }
      if (genre) {
        query.where('genre').equals(genre);
      }
      if (plot) {
        query.where('plot').equals(plot);
      }

      // Apply sorting: e.g. -title for descending, title for ascending
      if (sortBy) {
        const sortField = sortBy.substring(1); // Remove the '-' prefix from the sort field
        const sortOrder = sortBy.startsWith('-') ? -1 : 1; // -1 for descending, 1 for ascending
        query.sort({ [sortField]: sortOrder });
      }

      // Execute the query and return the result
      const movies = await query.exec();
      return movies;
    } catch (error) {
      console.log(error.message);
      throw new Error('Error retrieving movies');
    }
  }

  async createMovie(movieData) {
    try {
      const movie = await Movie.create();
      return movie;
    } catch (error) {
      throw new Error('Error creating Movie');
    }
  }
}

export default new MovieRepository();