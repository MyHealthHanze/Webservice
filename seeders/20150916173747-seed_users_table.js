'use strict';

var moment = require('moment');

module.exports = {
    up: function (queryInterface, Sequelize) {
        createUsersObject('John Bakker', 'johnbakker@gmail.com', 'test', 0, queryInterface, null);
        createUsersObject('Pieter-Jan van Bolgeren', 'pieterjan@gmail.com', 'test', 1, queryInterface, moment().utc().add(1, 'years').format("YYYY-MM-DD HH:mm:ss"));
        createUsersObject('Hermiena Driessen', 'hermienadriessen@gmail.com', 'test', 0, queryInterface, null);
        createUsersObject('Gert Pluim', 'gertpluim@gmail.com', 'test', 0, queryInterface, null);
        createUsersObject('Melissa Teunissen', 'melissateunissen@gmail.com', 'test', 0, queryInterface, null);
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};

function createUsersObject(name, email, password, changedPassword, queryInterface, disabledOn) {
    var bcrypt = require('bcryptjs');

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            queryInterface.bulkInsert('Users', [{
                name: name,
                email: email,
                password: hash,
                address: 'Zernikeplein 11',
                city: 'Groningen',
                doctorId: 1,
                changedPassword: changedPassword,
                amountOfFailedLoginAttempts: 0,
                disabledOn: disabledOn
            }], {});
        });
    });
}