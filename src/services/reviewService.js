import db from '../database/entity/index.js';

const Reviews = db['Review'];
const Busineses = db['Busineses'];
const User = db["User"];

// Add a review for a business
export const addReview = async (reviewData) => {
  try {
    const existingReview = await Reviews.findOne({
      where: {
        userId: reviewData.userId,
        businessId: reviewData.businessId,
      },
    });

    if (existingReview) {
      // Update existing review
      existingReview.rating = reviewData.rating;
      existingReview.review = reviewData.review;
      await existingReview.save();
      return existingReview;
    } else {
      // Create new review
      return await Reviews.create(reviewData);
    }
  } catch (error) {
    throw new Error(`Error adding review: ${error.message}`);
  }
};

// Get all reviews for a specific business
export const getBusinessReviews = async (businessId) => {
    try {
      // Fetch reviews with associated user details
      const reviews = await Reviews.findAll({
        where: { businessId },
        include: [
          { model: User, as: 'user', attributes: ['firstname', 'lastname'] },
          { model: Busineses, as: 'business', attributes: ['business_name'] },
        ],
      });
  
      // Calculate Rating Statistics
      const totalReviews = reviews.length;
      const averageRating = totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;
  
      // Statistics Breakdown
      const ratingBreakdown = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {});
  
      return {
        reviews,
        ratingStats: {
          totalReviews,
          averageRating,
          ratingBreakdown,
        },
      };
    } catch (error) {
      throw new Error(`Error fetching reviews: ${error.message}`);
    }
  };
// Get business details with reviews and rating statistics
export const getBusinessWithReviewsAndStats = async (businessId) => {
  try {
    const business = await Busineses.findOne({
      where: { id: businessId },
      include: [
        {
          model: Reviews,
          as: 'reviews',
          include: [{ model: db['User'], as: 'user', attributes: ['firstname', 'lastname'] }],
        },
      ],
    });

    if (!business) {
      throw new Error('Business not found');
    }

    const reviews = business.reviews;

    // Calculate average rating
    const totalReviews = reviews.length;
    const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalReviews ? (ratingSum / totalReviews).toFixed(1) : null;

    // Calculate rating distribution
    const ratingCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    reviews.forEach(review => {
      ratingCounts[review.rating] += 1;
    });

    const ratingStats = {
      totalReviews,
      averageRating,
      ratingCounts,
    };

    return { business, ratingStats };
  } catch (error) {
    throw new Error(`Error fetching business with reviews and stats: ${error.message}`);
  }
};

// Get all businesses with their reviews and rating statistics
export const getAllBusinessesWithReviewsAndStats = async () => {
  try {
    const businesses = await Busineses.findAll({
      include: [
        {
          model: Reviews,
          as: 'reviews',
          include: [{ model: db['User'], as: 'user', attributes: ['firstname', 'lastname'] }],
        },
      ],
    });

    return businesses.map(business => {
      const reviews = business.reviews;

      // Calculate average rating
      const totalReviews = reviews.length;
      const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalReviews ? (ratingSum / totalReviews).toFixed(1) : null;

      // Calculate rating distribution
      const ratingCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };

      reviews.forEach(review => {
        ratingCounts[review.rating] += 1;
      });

      const ratingStats = {
        totalReviews,
        averageRating,
        ratingCounts,
      };

      return { business, ratingStats };
    });
  } catch (error) {
    throw new Error(`Error fetching businesses with reviews and stats: ${error.message}`);
  }
};
