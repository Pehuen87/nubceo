"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tvShowController_1 = require("../controllers/tvShowController");
const router = express_1.default.Router();
// GET /tvshows/:id
router.get('/:id', tvShowController_1.getTvShow);
exports.default = router;
//# sourceMappingURL=tvShowRoutes.js.map