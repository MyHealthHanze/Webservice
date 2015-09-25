'use strict';

var moment = require('moment');

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.bulkInsert('PulseMeasurements', [{
            userId: 1,
            measurementValue: 59,
            measurementDate: moment().format('YYYY-MM-DD HH:mm:ss')
        }, {
            userId: 2,
            measurementValue: 76,
            measurementDate: moment().format('YYYY-MM-DD HH:mm:ss')
        }], {});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('PulseMeasurements', null, {});
    }
};
