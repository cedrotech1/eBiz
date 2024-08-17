import db from "../database/entity/index.js";

const Favorites = db["Favorite"];
const Users = db["User"];
const Busineses = db["Busineses"];
const Reviews = db["Review"];

export const addFavorite = async (favoriteData) => {
  try {
    return await Favorites.create(favoriteData);
  } catch (error) {
    throw new Error(`Error adding favorite: ${error.message}`);
  }
};

export const getUserFavorites = async (userId) => {
  try {
    const favorites = await Favorites.findAll({
      where: { userId },
      include: [
        {
          model: Busineses,
          as: "BusinessFav",
          include: [
            {
              model: Reviews,
              as: 'Reviews',
              include: [{ model: Users, as: 'user', attributes: ['firstname', 'lastname'] }]
            }
          ]
        }
      ]
    });

    return favorites.map(favorite => {
      const business = favorite.BusinessFav;
      const reviews = business.Reviews;

      // Calculate Rating Statistics
      const totalReviews = reviews.length;
      const averageRating = totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

      const ratingBreakdown = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {});

      return {
        ...favorite.toJSON(),
        business: {
          ratingStats: {
            totalReviews,
            averageRating,
            ratingBreakdown,
          }
        }
      };
    });
  } catch (error) {
    throw new Error(`Error fetching favorites: ${error.message}`);
  }
};

export const removeFavorite = async (userId, businessId) => {
  try {
    const favorite = await Favorites.findOne({
      where: {
        userId,
        businessId,
      },
    });

    if (!favorite) {
      throw new Error('Favorite not found');
    }

    await favorite.destroy();
    return favorite;
  } catch (error) {
    throw new Error(`Error removing favorite: ${error.message}`);
  }
};

export const checkExistingFav = async (userId, businessId) => {
  try {
    const favorite = await Favorites.findOne({
      where: { 
        userId,
        businessId
      }
    });

    return favorite;
  } catch (error) {
    console.error("Error checking for existing favorite:", error);
    throw error;
  }
};
