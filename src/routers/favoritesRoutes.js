import express from 'express';
import {
  addFavoriteController,
  getUserFavoritesController,
  removeFavoriteController,
} from '../controllers/FavoritesController';
import { protect } from "../middlewares/protect";

const router = express.Router();

router.post('/',protect, addFavoriteController); // Add to favorites
router.get('/all', protect, getUserFavoritesController); // Get user favorites
router.delete('/:businessId', protect, removeFavoriteController); // Remove from favorites

export default router;
