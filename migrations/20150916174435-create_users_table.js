'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'Users',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                createdAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW
                },
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
                address: Sequelize.STRING,
                city: Sequelize.STRING,
                doctorId: Sequelize.INTEGER,
                disabled: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                },
                changedPassword: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                },
                amountOfFailedLoginAttempts: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0
                },
                disabledOn: {
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
        return queryInterface.dropTable('users');
    }
};
