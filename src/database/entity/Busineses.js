"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Busineses extends Model {
    static associate(models) {
      Busineses.belongsTo(models.User, { foreignKey: "userid", as: "BusinesesUser" });
    }
  }

  Busineses.init(
    {
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT, // Using TEXT as it allows for longer descriptions
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      business_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      tin_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      business_sector: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Uncomment and add this if 'korariId' is a required column
      // korariId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
    },
    {
      sequelize,
      modelName: "Busineses",
    }
  );

  return Busineses;
};
