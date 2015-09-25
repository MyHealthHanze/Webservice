'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
        'Bills',
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
            defaultValue: null // Should be Sequelize.fn('NOW')
          },
          userId: Sequelize.INTEGER,
          healthCareId: Sequelize.INTEGER,
          billState: {
            type: Sequelize.ENUM,
            values: ['pending', 'payed']
          }
        },
        {
          engine: 'InnoDB',
          charset: 'latin1'
        }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Bills');
  }
};
