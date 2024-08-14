'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Busineses', [
      {
        userid: 1, // Assuming the 'super-admin' user has ID 1
        business_name: 'Tech Solutions Ltd.',
        tin_number: 'TIN123456789',
        address: '123 Main St',
        city: 'Kigali',
        state: 'Nyarugenge',
        country: 'Rwanda',
        postal_code: '12345',
        phone_number: '0781234567',
        email: 'info@techsolutions.com',
        website: 'https://techsolutions.com',
        business_sector: 'IT Services',
        status: 'active',
        latitude: -1.950880,
        longitude: 30.058850,
        file: null, // Assuming no file is uploaded yet
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 2, // Assuming the 'user' Cedrick Hakuzimana has ID 2
        business_name: 'Cedro Enterprise',
        tin_number: 'TIN987654321',
        address: '456 Business St',
        city: 'Huye',
        state: 'Southern Province',
        country: 'Rwanda',
        postal_code: '67890',
        phone_number: '0784366616',
        email: 'cedrick@cedroenterprise.com',
        website: 'https://cedroenterprise.com',
        business_sector: 'E-commerce',
        status: 'active',
        latitude: -2.596670,
        longitude: 29.740100,
        file: null, // Assuming no file is uploaded yet
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Busineses', null, {});
  }
};
