"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tvShowController_1 = require("../controllers/tvShowController");
const episodeController_1 = require("../controllers/episodeController");
const tvShowRouter = express_1.default.Router();
// GET /tvshows/:id
tvShowRouter.get('/', tvShowController_1.getAllTvShows);
// GET /tvshows/:id
tvShowRouter.get('/:id', tvShowController_1.getTvShow);
// GET /tvshows/:id/episode/:episodeId
tvShowRouter.get('/:id/episode/:episodeId', episodeController_1.getEpisode);
// POST /tvshows
tvShowRouter.post('/', tvShowController_1.createTvShow);
exports.default = tvShowRouter;
//# sourceMappingURL=tvShowRoutes.js.map