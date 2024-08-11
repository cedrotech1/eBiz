'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Busineses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT, // Changed from STRING to TEXT
        allowNull: true, // Changed to allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      business_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tin_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      business_sector: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: true,
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: true,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Busineses');
  }
};
