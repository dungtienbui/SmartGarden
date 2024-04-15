'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Threshold', {
      SensorId: {
        type: Sequelize.STRING
      },
      upperBound: {
        type: Sequelize.INTEGER
      },
      lowerBound: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Threshold');
  }
};