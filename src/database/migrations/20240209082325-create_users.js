'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },

      role: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      resetkey:{
        type: Sequelize.STRING,
      },
      notify:{
        type: Sequelize.STRING,
      },
      file:{
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Users');
  }
};
