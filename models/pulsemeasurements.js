module.exports = function (sequelize, DataTypes) {

    var PulseMeasurements = sequelize.define('PulseMeasurements', {
        userId: DataTypes.INTEGER,
        measurementValue: DataTypes.INTEGER,
        measurementDate: DataTypes.DATE
    });

    return PulseMeasurements;
};
