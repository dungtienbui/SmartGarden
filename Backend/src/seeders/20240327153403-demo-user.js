'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
        {
            firstName: 'Doe',
            lastName: 'John',
            email: 'a@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date()
        }, 
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'b@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
