module.exports = function (sequelize, DataTypes) {

    var Users = sequelize.define('Users', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        disabled: DataTypes.BOOLEAN,
        changedPassword: DataTypes.BOOLEAN
    });

    return Users;
};