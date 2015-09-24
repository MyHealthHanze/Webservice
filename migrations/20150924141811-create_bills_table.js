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
            defaultValue: Sequelize.fn('NOW')
          },
          updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW')
          },
          userId: {
            type: Sequelize.INTEGER,
            references: 'Users',
            referenceKey: 'id'
          },
          healthCareId: Sequelize.INTEGER,
          billState: Sequelize.ENUM
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
