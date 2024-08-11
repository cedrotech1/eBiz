"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Add associations here if needed
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
      modelName: "User", // Use singular name for the model
    }
  );

  return User;
};
