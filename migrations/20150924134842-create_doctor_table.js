'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
        'Doctors',
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
          name: Sequelize.STRING,
          email: Sequelize.STRING
        },
        {
          engine: 'InnoDB',
          charset: 'latin1'
        }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Doctors');
  }
};
