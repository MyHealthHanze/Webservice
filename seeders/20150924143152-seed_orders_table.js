'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.bulkInsert('Orders', [{
      billId: 1,
      description: 'Bill from OldHospital',
      code: 'ACODE1',
      price: 9.12
    },{
      billId: 2,
      description: 'Bill from NewHospital',
      code: 'ACODE2',
      price: 12.34
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
