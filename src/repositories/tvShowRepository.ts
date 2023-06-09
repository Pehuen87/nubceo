import Actor from '../models/actorModel';
import Director from '../models/directorModel';
import TVShow from '../models/tvShowModel';

class TVShowRepository {



  async getAllTVShows() {
    try {
      const tvShows = await TVShow.find().populate('actors').populate('episodes.director');
      return tvShows;
    } catch (error) {

      console.log(error.message);
      throw new Error('Error retrieving TV shows');
    }
  }

  async getTVShowById(id: string) {
    try {
      const tvShow = await TVShow.findById(id).populate('actors').populate('episodes.director');
      return tvShow;
    } catch (error) {
      throw new Error('Error retrieving TV show');
    }
  }

  async getEpisodebyId(tvShowId: string, episodeId: string) {
    try {
      const tvShow = await this.getTVShowById(tvShowId);
      const episode = tvShow.episodes.find(e => e.episodeId === episodeId);
      return episode;
    } catch (error) {
      throw new Error('Error retrieving Episodes');
    }
  }

  async getAllEpisodes(tvShowId: string) {
    try {
      const tvShow = await this.getTVShowById(tvShowId);
      return tvShow.episodes;
    } catch (error) {
      throw new Error('Error retrieving Episodes');
    }
  }

  async createTVShow({ title, genre, seasons, plot, episodes, actors }) {
    try {
    // Create a new TV show object
    const newTvShow = new TVShow({
      title, genre, seasons, plot, episodes, actors
    })

      const tvShow = await TVShow.create(newTvShow);
      return tvShow;
    } catch (error) {
      throw new Error('Error creating TV show');
    }
  }
}

export default new TVShowRepository();