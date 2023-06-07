"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TVShow = void 0;
var mongoose_1 = require("mongoose");
var tvShowSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    plot: String,
    episodes: [{
            id: String,
            title: String,
            director: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Director' },
            season: Number
        }],
    actors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Actor' }]
});
exports.TVShow = (0, mongoose_1.model)('TVShow', tvShowSchema);
