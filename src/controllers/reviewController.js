import {
    addReview,
    getBusinessReviews,
    getBusinessWithReviewsAndStats,
    getAllBusinessesWithReviewsAndStats
  } from '../services/reviewService';
  
  export const addReviewController = async (req, res) => {
    try {
      const reviewData = {
        userId: req.user.id,
        businessId: req.body.businessId,
        rating: req.body.rating,
        review: req.body.review,
      };
  
      const newReview = await addReview(reviewData);
      return res.status(201).json({
        success: true,
        message: 'Review added successfully',
        review: newReview,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.message,
      });
    }
  };
  
  export const getReviewsController = async (req, res) => {
    try {
      const reviews = await getBusinessReviews(req.params.businessId);
      return res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.message,
      });
    }
  };
  
  export const getBusinessWithReviewsAndStatsController = async (req, res) => {
    try {
      const { business, ratingStats } = await getBusinessWithReviewsAndStats(req.params.businessId);
      return res.status(200).json({
        success: true,
        business,
        ratingStats,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.message,
      });
    }
  };
  
  export const getAllBusinessesWithReviewsAndStatsController = async (req, res) => {
    try {
      const businesses = await getAllBusinessesWithReviewsAndStats();
      return res.status(200).json({
        success: true,
        businesses,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.message,
      });
    }
  };
  