"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const episodeController_1 = require("../controllers/episodeController");
const episodeRouter = express_1.default.Router({ mergeParams: true });
// GET /tvshows/:id/episodes/
episodeRouter.get('', episodeController_1.getAllEpisodes);
// GET /tvshows/:id/episodes/:episodeid
episodeRouter.get('/:episodeid', episodeController_1.getEpisode);
// POST /tvshows/:id/episodes
episodeRouter.post('/', episodeController_1.createEpisode);
exports.default = episodeRouter;
//# sourceMappingURL=episodeRoutes.js.map