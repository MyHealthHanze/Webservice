'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.bulkInsert('Bills', [{
      userId: 1,
      healthCareId: 1,
      billState: 'pending'
    },{
      userId: 2,
      healthCareId: 2,
      billState: 'payed'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bills', null, {});
  }
};
