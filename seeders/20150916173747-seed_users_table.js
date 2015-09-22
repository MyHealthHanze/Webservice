'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    createUsersObject('John Bakker', 'johnbakker@gmail.com', 'test', 0, queryInterface);
    createUsersObject('Pieter-Jan van Bolgeren', 'pieterjan@gmail.com', 'test', 1, queryInterface);
    createUsersObject('Hermiena Driessen', 'hermienadriessen@gmail.com', 'test', 0, queryInterface);
    createUsersObject('Gert Pluim', 'gertpluim@gmail.com', 'test', 0, queryInterface);
    createUsersObject('Melissa Teunissen', 'melissateunissen@gmail.com', 'test', 0, queryInterface);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

function createUsersObject(name, email, password, disabled, queryInterface) {
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
        disabled: disabled,
        changedPassword: 1,
        amountOfFailedLoginAttempts: 0
      }], {});
    });
  });
}