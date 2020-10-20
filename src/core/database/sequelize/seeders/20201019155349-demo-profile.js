/* eslint-disable @typescript-eslint/no-var-requires */
const faker = require('faker');

module.exports = {
  up: (queryInterface) => {
    const profiles = [];

    for (let i = 0; i < 10; i++) {
      const seedData = {
        avatarImage: faker.image.avatar(),
        coverImage: faker.image.imageUrl(),
        bio: faker.lorem.sentence(),
        userId: i+1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      profiles.push(seedData);
    }

    return queryInterface.bulkInsert('Profiles', profiles);
  },
  down: queryInterface => queryInterface.bulkDelete('Profiles')
};
