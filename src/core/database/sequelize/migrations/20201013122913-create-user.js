/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isVerify: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['male', 'female'],
        allowNull: false,
      },
      dateOfBirth: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      resetPasswordToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verifyToken: {
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
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('Users'),
};
