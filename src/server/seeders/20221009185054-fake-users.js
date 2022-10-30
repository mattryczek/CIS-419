'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      avatar: '/uploads/mateusz.png',
      username: 'Mateusz',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: '$2a$10$bE3ovf9/Tiy/d68bwNUQ0.zCjwtNFq9ukg9h4rhKiHCb6x5ncKife',
      email: 'mateusz@northwestern.edu',
    },
    {
      avatar: '/uploads/charlie.png',
      username: 'Charlie',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: '$2a$10$bE3ovf9/Tiy/d68bwNUQ0.zCjwtNFq9ukg9h4rhKiHCb6x5ncKife',
      email: 'charlie@northwestern.edu',
    }],
    {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};