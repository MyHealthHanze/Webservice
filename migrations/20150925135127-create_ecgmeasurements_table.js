'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'ECGMeasurements',
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
        return queryInterface.dropTable('ECGMeasurements');
    }
};
