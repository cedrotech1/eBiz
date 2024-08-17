import db from "../database/entity/index.js";

const users = db["User"];
const Busineses = db["Busineses"];
const Reviews = db['Review'];


export const createBusineses = async (BusinesesData) => {
  try {
    return await Busineses.create(BusinesesData);
  } catch (error) {
    throw new Error(`Error creating Busineses: ${error.message}`);
  }
};

export const getAllBusineses = async () => {
  try {
    const businesses = await Busineses.findAll({
      include: [
        {
          model: Reviews,
          as: 'Reviews',
          include: [{ model: users, as: 'user', attributes: ['firstname', 'lastname'] }]
        }
      ]
    });

    const businessesWithStats = await Promise.all(businesses.map(async (business) => {
      const reviews = business.Reviews;
      const totalReviews = reviews.length;
      const averageRating = totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

      const ratingBreakdown = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {});

      return {
        business,
        ratingStats: {
          totalReviews,
          averageRating,
          ratingBreakdown,
        },
      };
    }));

    return businessesWithStats;
  } catch (error) {
    throw new Error(`Error fetching all businesses with reviews and ratings: ${error.message}`);
  }
};



// ckeckBusineses



export const updateUser = async (userId, points) => {
  try {
    const userToUpdate = await users.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });

    if (userToUpdate) {
      await userToUpdate.update({ points: points });
      const updatedUser = await users.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      return updatedUser;
    }


    return null;
  } catch (error) {
    console.error("Error updating user with restaurant:", error);
    throw error;
  }
};

export const updateOneBusineses = async (id, BusinesesData) => {
  try {
    const BusinesesToUpdate = await Busineses.findOne({ where: { id } });
    
    if (!BusinesesToUpdate) {
      return null;
    }

    await Busineses.update(BusinesesData, { where: { id } });
    const updatedBusineses = await Busineses.findOne({ where: { id } });

    return updatedBusineses;
  } catch (error) {
    console.error('Error updating Busineses:', error);
    throw error;
  }
};

export const checkExistingBuz = async (businessId) => {
  try {
    const business = await Busineses.findOne({
      where: { 
        id: businessId,
      }
    });

    return business;
  } catch (error) {
    console.error("Error checking for existing favorite:", error);
    throw error;
  }
};







export const checkExistingBusineses = async (id) => {
  try {
    const business = await Busineses.findOne({
      where: { id },
    });

    return business; // Returns null if not found, otherwise returns the business object
  } catch (error) {
    console.error("Error checking business:", error);
    throw error;
  }
};

export const deleteOneBusineses = async (id) => {
  const restToDelete = await Busineses.findOne({ where: { id } });
  if (restToDelete) {
    await Busineses.destroy({ where: { id } });
    return restToDelete;
  }
  return null;
};



export const getBusinessWithReviewsAndRatings = async (businessId) => {
  try {
    const business = await Busineses.findOne({
      where: { id: businessId },
      include: [
        {
          model: Reviews,
          as: 'Reviews',
          include: [{ model: users, as: 'user', attributes: ['firstname', 'lastname'] }]
        }
      ]
    });

    if (!business) {
      return null;
    }

    // Calculate Rating Statistics
    const reviews = business.Reviews;
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

    const ratingBreakdown = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});

    return {
      business,
      ratingStats: {
        totalReviews,
        averageRating,
        ratingBreakdown,
      },
    };
  } catch (error) {
    throw new Error(`Error fetching business with reviews and ratings: ${error.message}`);
  }
};

export const getAllBusinessesWithReviewsAndRatings = async () => {
  try {
    const businesses = await Busineses.findAll({
      include: [
        {
          model: Reviews,
          as: 'Reviews',
          include: [{ model: users, as: 'user', attributes: ['firstname', 'lastname'] }]
        }
      ]
    });

    const businessesWithStats = await Promise.all(businesses.map(async (business) => {
      const reviews = business.Reviews;
      const totalReviews = reviews.length;
      const averageRating = totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

      const ratingBreakdown = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {});

      return {
        business,
        ratingStats: {
          totalReviews,
          averageRating,
          ratingBreakdown,
        },
      };
    }));

    return businessesWithStats;
  } catch (error) {
    throw new Error(`Error fetching all businesses with reviews and ratings: ${error.message}`);
  }
};