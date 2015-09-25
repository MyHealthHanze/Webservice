module.exports = function (sequelize, DataTypes) {

    var ECGMeasurements = sequelize.define('ECGMeasurements', {
        userId: DataTypes.INTEGER,
        measurementDate: DataTypes.DATE
    });

    return ECGMeasurements;
};