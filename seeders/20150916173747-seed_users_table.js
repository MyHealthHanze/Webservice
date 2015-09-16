'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    createUsersObject('John Bakker', 'johnbakker@gmail.com', 'test', queryInterface);
    createUsersObject('Pieter-Jan van Bolgeren', 'pieterjan@gmail.com', 'test', queryInterface);
    createUsersObject('Hermiena Driessen', 'hermienadriessen@gmail.com', 'test', queryInterface);
    createUsersObject('Gert Pluim', 'gertpluim@gmail.com', 'test', queryInterface);
    createUsersObject('Melissa Teunissen', 'melissateunissen@gmail.com', 'test', queryInterface);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

function createUsersObject(name, email, password, queryInterface) {
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
        disabled: 0,
        changedPassword: 1
      }], {});
    });
  });
}