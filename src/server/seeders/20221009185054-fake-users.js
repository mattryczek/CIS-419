'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      avatar: '/uploads/mateusz.png',
      username: 'Mateusz',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      avatar: '/uploads/charlie.png',
      username: 'Charlie',
      createdAt: new Date(),
      updatedAt: new Date(),
    }],
    {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};