import { ITVShow, TVShow } from '../models/tvShowModel';

class TVShowRepository {
  async getAllTVShows(): Promise<ITVShow[]> {
    try {
      const tvShows = await TVShow.find();
      return tvShows;
    } catch (error) {
      throw new Error('Error retrieving TV shows');
    }
  }

  async getTVShowById(id: string): Promise<ITVShow | null> {
    try {
      const tvShow = await TVShow.findById(id);
      return tvShow;
    } catch (error) {
      throw new Error('Error retrieving TV show');
    }
  }

  async createTVShow(tvShowData: Partial<ITVShow>): Promise<ITVShow> {
    try {
      const tvShow = await TVShow.create(tvShowData);
      return tvShow;
    } catch (error) {
      throw new Error('Error creating TV show');
    }
  }
}

export default new TVShowRepository();