'use strict';

var moment = require('moment');

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.bulkInsert('ECGMeasurements', [{
            userId: 1,
            measurementDate: moment().format('YYYY-MM-DD HH:mm:ss')
        }, {
            userId: 2,
            measurementDate: moment().format('YYYY-MM-DD HH:mm:ss')
        }], {});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('ECGMeasurements', null, {});
    }
};
