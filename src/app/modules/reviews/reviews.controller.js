
import { Review } from './reviews.model.js';

// POST: Add review to a product
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.create({
      user: req.user.id,
      
      product: req.params.productId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to add review",
      error: err.message,
    });
  }
};

// GET: Get all reviews of a product
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch reviews",
      error: err.message,
    });
  }
};

// DELETE: Delete specific review
export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const review = await Review.findOneAndDelete({ _id: reviewId, product: productId });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to delete review",
      error: err.message,
    });
  }
};
