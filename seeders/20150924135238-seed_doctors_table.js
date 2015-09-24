'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.bulkInsert('Doctors', [{
      name: "Henk",
      email: "docterhenk@praktijk.nl"
    },{
      name: 'Piet',
      email: 'docterpiet@praktijk.nl'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Doctors', null, {});
  }
};
