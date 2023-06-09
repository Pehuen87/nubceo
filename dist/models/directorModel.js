"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const directorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    bio: { type: String },
    avatar: { type: String }
});
// Define a virtual property "id" based on the "_id" field
directorSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
// Ensure virtual fields are serialized when converting to JSON
directorSchema.set('toJSON', {
    virtuals: true,
});
const Director = (0, mongoose_1.model)('Director', directorSchema);
exports.default = Director;
//# sourceMappingURL=directorModel.js.map