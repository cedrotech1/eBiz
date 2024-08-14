import db from "../database/entity/index.js";

const Favorites = db["Favorite"];
const Users = db["User"];
const Busineses = db["Busineses"];

export const addFavorite = async (favoriteData) => {
  try {
    return await Favorites.create(favoriteData);
  } catch (error) {
    throw new Error(`Error adding favorite: ${error.message}`);
  }
};

export const getUserFavorites = async (userId) => {
  try {
    return await Favorites.findAll({
      where: { userId },
      include: [
        {
          model: Busineses,
          as: "BusinessFav",
        },
      ],
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
        userId: userId,
        businessId: businessId
      }
    });

    return favorite;
  } catch (error) {
    console.error("Error checking for existing favorite:", error);
    throw error;
  }
};
