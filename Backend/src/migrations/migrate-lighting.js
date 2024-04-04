'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lighting', {
      deviceId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      intensity: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lighting');
  }
};