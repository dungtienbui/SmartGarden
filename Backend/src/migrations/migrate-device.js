'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Device', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      currentState: {
        type: Sequelize.BOOLEAN
      },
      isAppliedThreshold: {
        type: Sequelize.BOOLEAN
      },
      isAppliedSchedule: {
        type: Sequelize.BOOLEAN
      },
      gardenId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Device');
  }
};