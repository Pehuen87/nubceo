import express from 'express';
import { getTvShow } from '../controllers/tvShowController';

const router = express.Router();

// GET /tvshows/:id
router.get('/:id', getTvShow);



export default router;