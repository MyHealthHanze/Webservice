module.exports = function (sequelize, DataTypes) {

    var Users = sequelize.define('Users', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        changedPassword: DataTypes.BOOLEAN,
        amountOfFailedLoginAttempts: DataTypes.INTEGER,
        disabledOn: DataTypes.DATE
    });

    return Users;
};