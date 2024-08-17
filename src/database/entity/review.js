"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Review extends Model {
    static associate(models) {
      // Associations with Busineses and User models
      Review.belongsTo(models.Busineses, { foreignKey: "businessId", as: "business" });
      Review.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }

  Review.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );

  return Review;
};
