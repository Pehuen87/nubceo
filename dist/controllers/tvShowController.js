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
exports.createTvShow = exports.getAllTvShows = exports.getTvShow = void 0;
const tvShowRepository_1 = __importDefault(require("../repositories/tvShowRepository"));
// GET /tvshows
function getAllTvShows(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tvShows = yield tvShowRepository_1.default.getAllTVShows();
            res.json(tvShows);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.getAllTvShows = getAllTvShows;
// GET /tvshows/:id
function getTvShow(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tvShowId = req.params.id;
        try {
            const tvShows = yield tvShowRepository_1.default.getTVShowById(tvShowId);
            res.json(tvShows);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.getTvShow = getTvShow;
// POST /tvshows
function createTvShow(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Save the TV show using the repository
            const createdTvShow = yield tvShowRepository_1.default.createTVShow(req.body);
            res.json(createdTvShow);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.createTvShow = createTvShow;
//# sourceMappingURL=tvShowController.js.map