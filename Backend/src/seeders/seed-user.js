'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  	async up (queryInterface, Sequelize) {
     	await queryInterface.bulkInsert('User', [{
       		username: 'admin',
			password: '$2a$10$fMoCVw3zX8DILSwBER6JfeM3v5EIYeXO9rB7jerczXa51tBx3ksFS',
			createdAt: new Date(),
	    }], {});
  	},

  	async down (queryInterface, Sequelize) {
    	await queryInterface.bulkDelete('User', null, {});
  	}
};
