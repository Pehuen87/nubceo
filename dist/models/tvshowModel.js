"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TVShow = void 0;
const mongoose_1 = require("mongoose");
const tvShowSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    plot: String,
    episodes: [{
            episodeId: String,
            title: String,
            director: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Director' },
            season: Number
        }],
    actors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Actor' }]
});
// Define a virtual property "id" based on the "_id" field
tvShowSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
// Ensure virtual fields are serialized when converting to JSON
tvShowSchema.set('toJSON', {
    virtuals: true,
});
exports.TVShow = (0, mongoose_1.model)('TVShow', tvShowSchema);
//# sourceMappingURL=tvShowModel.js.map