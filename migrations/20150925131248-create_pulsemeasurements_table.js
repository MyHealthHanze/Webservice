'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'PulseMeasurements',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                createdAt: {
                    type: Sequelize.DATE,
                    defaultValue: null
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    defaultValue: null
                },
                userId: Sequelize.INTEGER,
                measurementValue: Sequelize.INTEGER,
                measurementDate: {
                    type: Sequelize.DATE,
                    defaultValue: null
                }
            },
            {
                engine: 'InnoDB',
                charset: 'latin1'
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('PulseMeasurements');
    }
};
