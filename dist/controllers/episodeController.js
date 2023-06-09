"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEpisode = exports.getAllEpisodes = exports.getEpisode = void 0;
const tvShowRepository_1 = __importDefault(require("../repositories/tvShowRepository"));
// GET /tvshows/:id/episodes
function getAllEpisodes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tvShowId = req.params.id;
        try {
            const episode = yield tvShowRepository_1.default.getAllEpisodes(tvShowId);
            res.json(episode);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.getAllEpisodes = getAllEpisodes;
// GET /tvshows/:id/episodes/:episodeId
function getEpisode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tvShowId = req.params.id;
        const episodeId = req.params.episodeId;
        try {
            const episode = yield tvShowRepository_1.default.getEpisodebyId(tvShowId, episodeId);
            res.json(episode);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.getEpisode = getEpisode;
// POST /tvshows/:id/episodes
function createEpisode(req, res) {
    const tvShowId = req.params.id;
    // Create a new episode using the TV show ID and request body
    // Example: const newEpisode = await Episode.create({ tvShowId, ...req.body });
    res.send(`New episode created for TV Show ID: ${tvShowId}`);
}
exports.createEpisode = createEpisode;
//# sourceMappingURL=episodeController.js.map