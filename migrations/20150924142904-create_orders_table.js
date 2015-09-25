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
            defaultValue: Sequelize.fn('NOW')
          },
          updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW')
          },
          billId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Bills',
              key: 'id'
            }
          },
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
