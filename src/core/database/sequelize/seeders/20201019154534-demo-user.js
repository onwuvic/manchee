/* eslint-disable @typescript-eslint/no-var-requires */
const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    const gender = ['male', 'female'];
    const users = [{
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: bcrypt.hashSync('password', 10),
      isVerify: true,
      gender: 'female',
      createdAt: new Date(),
      updatedAt: new Date()
    }];

    for (let i = 1; i < 10; i++) {
      const seedData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('password', 10),
        isVerify: true,
        gender: faker.random.arrayElement(gender),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      users.push(seedData);
    }

    return queryInterface.bulkInsert('Users', users);
  },
  down: queryInterface => queryInterface.bulkDelete('Users')
};
