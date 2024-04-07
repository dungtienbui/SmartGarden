'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MeasuredValue', {
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sensorId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.INTEGER
      },
      isOutThreshold: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MeasuredValue');
  }
};