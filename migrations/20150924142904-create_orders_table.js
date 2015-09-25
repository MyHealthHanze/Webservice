'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
        'Orders',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          createdAt: {
            type: Sequelize.DATE,
            defaultValue: null // Should be Sequelize.fn('NOW')
          },
          updatedAt: {
            type: Sequelize.DATE,
            defaultValue: null
          },
          billId: Sequelize.INTEGER,
          description: Sequelize.STRING,
          code: Sequelize.STRING,
          price: Sequelize.FLOAT
        },
        {
          engine: 'InnoDB',
          charset: 'latin1'
        }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');
  }
};
