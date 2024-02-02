/* eslint-disable @typescript-eslint/no-var-requires */
const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    const gender = ['male', 'female'];
    const users = [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        username: 'jane.doe',
        password: bcrypt.hashSync('password', 10),
        isVerify: true,
        gender: 'female',
        dateOfBirth: faker.date.past(20, '2002-12-06T20:02:56+01:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (let i = 1; i < 10; i++) {
      const seedData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: bcrypt.hashSync('password', 10),
        isVerify: true,
        gender: faker.random.arrayElement(gender),
        dateOfBirth: faker.date.past(30, '2002-12-06T20:02:56+01:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(seedData);
    }

    return queryInterface.bulkInsert('Users', users);
  },
  down: (queryInterface) => queryInterface.bulkDelete('Users'),
};
