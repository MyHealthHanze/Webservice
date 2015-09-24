'use strict';

var moment = require('moment');

module.exports = {
    up: function (queryInterface, Sequelize) {
        createUsersObjects(queryInterface, 'test');
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};

function createUsersObjects(queryInterface, password) {
    var bcrypt = require('bcryptjs');

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            createUsersObject('John Bakker', 'johnbakker@gmail.com', hash, false, queryInterface, null);
            createUsersObject('Pieter-Jan van Bolgeren', 'pieterjan@gmail.com', hash, true, queryInterface, moment().utc().add(1, 'years').format("YYYY-MM-DD HH:mm:ss"));
            createUsersObject('Hermiena Driessen', 'hermienadriessen@gmail.com', hash, false, queryInterface, null);
            createUsersObject('Gert Pluim', 'gertpluim@gmail.com', hash, false, queryInterface, null);
            createUsersObject('Melissa Teunissen', 'melissateunissen@gmail.com', hash, false, queryInterface, null);
        });
    });
};


function createUsersObject(name, email, password, changedPassword, queryInterface, disabledOn) {
    queryInterface.bulkInsert('Users', [{
        name: name,
        email: email,
        password: password,
        address: 'Zernikeplein 11',
        city: 'Groningen',
        doctorId: 1,
        changedPassword: changedPassword,
        amountOfFailedLoginAttempts: 0,
        disabledOn: disabledOn
    }], {});
};