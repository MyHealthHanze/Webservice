'use strict';

var moment = require('moment');

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.bulkInsert('BloodPressureMeasurements', [{
            userId: 1,
            systolicValue: 145,
            diastolicValue: 95,
            measurementDate: moment().format('YYYY-MM-DD HH:mm:ss')
        }, {
            userId: 2,
            systolicValue: 117,
            diastolicValue: 76,
            measurementDate: moment().format('YYYY-MM-DD HH:mm:ss')
        }], {});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('BloodPressureMeasurements', null, {});
    }
};
