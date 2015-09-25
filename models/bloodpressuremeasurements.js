module.exports = function (sequelize, DataTypes) {

    var BloodPressureMeasurements = sequelize.define('BloodPressureMeasurements', {
        userId: DataTypes.INTEGER,
        systolicValue: DataTypes.INTEGER,
        diastolicValue: DataTypes.INTEGER,
        measurementDate: DataTypes.DATE
    });

    return BloodPressureMeasurements;
};