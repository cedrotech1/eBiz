import express from 'express';
import { addReviewController, getReviewsController } from '../controllers/reviewController';
import { protect } from '../middlewares/protect';
const router = express.Router();

router.post('/reviews',protect, addReviewController);
router.get('/businesses/:businessId/reviews',protect, getReviewsController);

export default router;
