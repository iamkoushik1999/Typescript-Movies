import { Router } from 'express';
import { getMovies, postMovies, search } from '../controllers/movieController';
const router = Router();

// ---------------------------------------------------------

// GET
// MOVIES
router.route('/').get(getMovies);

// GET
// Search
router.route('/search').get(search);

// POST
// MOVIES
router.route('/').post(postMovies);

export default router;
