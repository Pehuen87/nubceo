"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    trailer: String,
    plot: String,
    director: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Director' },
    actors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Actor' }]
});
// Define a virtual property "id" based on the "_id" field
movieSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
// Ensure virtual fields are serialized when converting to JSON
movieSchema.set('toJSON', {
    virtuals: true,
});
exports.Movie = (0, mongoose_1.model)('Movie', movieSchema);
//# sourceMappingURL=movie.js.map