'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Threshold', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sensorType: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      isUpperBound: {
        type: Sequelize.BOOLEAN
      },
      gardenId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Threshold');
  }
};