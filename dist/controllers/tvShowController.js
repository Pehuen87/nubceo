"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTvShow = void 0;
const mock_1 = require("../helpers/mock");
const getTvShow = (req, res) => {
    const { id } = req.params;
    //TODO
    const db = (0, mock_1.generateDB)();
    const tvShow = db.tvshows.find((show) => show.id === id);
    if (!tvShow) {
        return res.status(404).json({ error: 'TV show not found' });
    }
    res.json(tvShow);
};
exports.getTvShow = getTvShow;
//# sourceMappingURL=tvShowController.js.map