"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.episode = void 0;
const mock_1 = require("../helpers/mock");
const episode = (req, res) => {
    const { id, episodeId } = req.params;
    //TODO
    const db = (0, mock_1.generateDB)();
    // Find the TV show by ID
    const tvShow = db.tvshows.find((show) => show.id === id);
    if (!tvShow) {
        return res.status(404).json({ error: 'TV show not found' });
    }
    // Find the episode by ID
    const episode = tvShow.episodes.find((ep) => ep.episodeId === episodeId);
    if (!episode) {
        return res.status(404).json({ error: 'Episode not found' });
    }
    // Find the director of the episode
    const director = db.directors.find((dir) => dir._id === episode.director);
    if (!director) {
        return res.status(404).json({ error: 'Director not found' });
    }
    const episodeWithDirector = Object.assign(Object.assign({}, episode), { director: director.name });
    res.json(episodeWithDirector);
};
exports.episode = episode;
//# sourceMappingURL=episode.js.map