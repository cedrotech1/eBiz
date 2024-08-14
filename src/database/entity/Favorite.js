"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: "userId", as: "User" });
      Favorite.belongsTo(models.Busineses, { foreignKey: "businessId", as: "BusinessFav" });
    }
  }

  Favorite.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );

  return Favorite;
};
