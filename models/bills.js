module.exports = function (sequelize, DataTypes) {

    var Bills = sequelize.define('Bills', {
        userId: DataTypes.INTEGER,
        healthCareId: DataTypes.INTEGER,
        billState: {
            type: DataTypes.ENUM,
            values: ['pending', 'payed']
        }
    }, {
        classMethods: {
            associate: function (models) {
                Bills.hasMany(models.Orders, {as: 'orders'});
            }
        }
    });

    return Bills;
};