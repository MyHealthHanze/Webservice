'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'ECGValues',
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
                ecgMeasurementId: Sequelize.INTEGER,
                measurementValue: Sequelize.DOUBLE
            },
            {
                engine: 'InnoDB',
                charset: 'latin1'
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('ECGValues');
    }
};
