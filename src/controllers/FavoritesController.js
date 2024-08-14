import {
    addFavorite,
    getUserFavorites,
    removeFavorite,
    checkExistingFav
  } from "../services/FavoritesService";

  import {
    checkExistingBusineses
  } from "../services/BusinesesService";
  
  
  export const addFavoriteController = async (req, res) => {
    try {
      const favoriteData = {
        userId: req.user.id,
        businessId: req.body.businessId,
      };

      

   

       // Check if the business exists
    const existingBuz = await checkExistingBusineses(req.body.businessId);
    if (!existingBuz) {
      return res.status(404).json({
        success: false,
        message: "This business was not found",
      });
    }

      const existingFav = await checkExistingFav(req.user.id, req.body.businessId);
    if (existingFav) {
      return res.status(400).json({
        success: false,
        message: "This business is already in your favorites",
      });
    }

  
      const newFavorite = await addFavorite(favoriteData);
      return res.status(201).json({
        success: true,
        message: "Business added to favorites successfully",
        favorite: newFavorite,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  };
  
  export const getUserFavoritesController = async (req, res) => {
    try {
      const userId = req.user.id;
      const favorites = await getUserFavorites(userId);
      return res.status(200).json({
        success: true,
        message: "Favorites retrieved successfully",
        favorites,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  };
  
  export const removeFavoriteController = async (req, res) => {
    try {
      const { businessId } = req.params;
      const userId = req.user.id;

      const existingBuz = await checkExistingBusineses(businessId);
      if (!existingBuz) {
        return res.status(404).json({
          success: false,
          message: "This business was not found",
        });
      }
  

      const existingFav = await checkExistingFav(userId,businessId);
      if (!existingFav) {
        return res.status(400).json({
          success: false,
          message: "This business not found in  your favorites",
        });
      }
  
  
      const removedFavorite = await removeFavorite(userId, businessId);
      return res.status(200).json({
        success: true,
        message: "Favorite removed successfully",
        favorite: removedFavorite,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  };
  