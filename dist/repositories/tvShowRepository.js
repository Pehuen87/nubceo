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
Object.defineProperty(exports, "__esModule", { value: true });
const tvShowModel_1 = require("../models/tvShowModel");
class TVShowRepository {
    getAllTVShows() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tvShows = yield tvShowModel_1.TVShow.find();
                return tvShows;
            }
            catch (error) {
                throw new Error('Error retrieving TV shows');
            }
        });
    }
    getTVShowById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tvShow = yield tvShowModel_1.TVShow.findById(id);
                return tvShow;
            }
            catch (error) {
                throw new Error('Error retrieving TV show');
            }
        });
    }
    createTVShow(tvShowData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tvShow = yield tvShowModel_1.TVShow.create(tvShowData);
                return tvShow;
            }
            catch (error) {
                throw new Error('Error creating TV show');
            }
        });
    }
}
exports.default = new TVShowRepository();
//# sourceMappingURL=tvShowRepository.js.map