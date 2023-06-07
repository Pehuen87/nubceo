"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const mongoose_1 = require("mongoose");
const actorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    bio: { type: String },
    avatar: { type: String },
    movies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Movie' }],
    tvShowEpisodes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'TVShow' }],
});
exports.Actor = (0, mongoose_1.model)('Actor', actorSchema);
//# sourceMappingURL=actor.js.map