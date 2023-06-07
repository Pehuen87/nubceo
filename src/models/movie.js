"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
var mongoose_1 = require("mongoose");
var movieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    trailer: String,
    plot: String,
    director: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Director' },
    actors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Actor' }]
});
exports.Movie = (0, mongoose_1.model)('Movie', movieSchema);
