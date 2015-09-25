'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.bulkInsert('ECGValues', [{
            ecgMeasurementId: 1,
            measurementValue: 500.0
        }, {
            ecgMeasurementId: 2,
            measurementValue: 400.0
        }], {});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('ECGValues', null, {});
    }
};
