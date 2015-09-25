module.exports = function (sequelize, DataTypes) {

    var ECGValues = sequelize.define('ECGValues', {
        ecgMeasurementId: DataTypes.INTEGER,
        measurementValue: DataTypes.DOUBLE,
    });

    return ECGValues;
};