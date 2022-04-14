'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'limapaulobsb',
        email: 'limapaulobsb@gmail.com',
        password: 'mengao',
        name: 'Paulo Lima',
        createdAt: new Date(),
        updatedAt: new Date(),
        admin: true,
      },
      {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        admin: false,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null);
  },
};
