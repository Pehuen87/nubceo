"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Director = void 0;
var mongoose_1 = require("mongoose");
var directorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    bio: { type: String },
    avatar: { type: String },
    movies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Movie' }],
    tvShowEpisodes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'TVShow' }],
});
exports.Director = (0, mongoose_1.model)('Director', directorSchema);
