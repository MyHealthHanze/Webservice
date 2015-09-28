module.exports = function (sequelize, DataTypes) {

    var ECGMeasurements = sequelize.define('ECGMeasurements', {
        userId: DataTypes.INTEGER,
        measurementValue: DataTypes.TEXT,
        measurementDate: DataTypes.DATE
    });

    return ECGMeasurements;
};