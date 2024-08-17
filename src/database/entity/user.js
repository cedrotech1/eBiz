"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Associations with Favorite and Busineses models
      User.hasMany(models.Favorite, { foreignKey: "userId", as: "Favorites" });
      User.hasMany(models.Busineses, { foreignKey: "userid", as: "busineses" });

      // Association with Review model
      User.hasMany(models.Review, { foreignKey: "userId", as: "reviews" });
    }
  }

  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      password: DataTypes.STRING,
      resetkey: DataTypes.STRING,
      notify: DataTypes.STRING,
      file: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
