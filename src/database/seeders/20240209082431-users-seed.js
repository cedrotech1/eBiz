import bcrypt from "bcrypt";

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash("1234", saltRounds);
    await queryInterface.bulkInsert('Users', [
      {
        firstname: 'kabano',
        lastname: 'super-admin',
        email: 'superadmin@gmail.com',
        role: 'superadmin',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'cedro',
        lastname: 'hakuzimana',
        email: 'cedrickhakuzimana@gmail.com',
        role: 'user',
        phone: '0784366616',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
   
   
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
