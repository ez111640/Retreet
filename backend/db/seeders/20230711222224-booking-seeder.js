'use strict';

const { Booking } = require('../models');



/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await Booking.bulkCreate([
      {
        'spotId': '1',
        'userId': '2',
        'startDate': "2020-10-29",
        'endDate': "2020-11-03"
      },
      {
        'spotId': '1',
        'userId': '3',
        'startDate': "2020-08-30",
        'endDate': "2020-10-19"
      },
      {
        'spotId': '2',
        'userId': '2',
        'startDate': "2020-08-30",
        'endDate': "2020-10-19"
      },
      {
        'spotId': '3',
        'userId': '3',
        'startDate': "2020-08-30",
        'endDate': "2020-10-19"
      },
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = ('Bookings');
    return queryInterface.bulkDelete(options)
  }
};
