

import express from 'express';
import {
  createReview,
  getProductReviews,
  deleteReview,
} from './reviews.controller.js';


const router = express.Router();

router.post('/:productId', createReview);
router.get('/:productId', getProductReviews);
router.delete('/:productId/:reviewId', deleteReview);

export const reviewRoutes = router;
