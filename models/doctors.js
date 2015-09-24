module.exports = function (sequelize, DataTypes) {

    var Doctors = sequelize.define('Doctors', {
        name: DataTypes.STRING,
        email: DataTypes.STRING
    });

    return Doctors;
};