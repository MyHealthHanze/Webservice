module.exports = function (sequelize, DataTypes) {

    var Orders = sequelize.define('Orders', {
        billId: DataTypes.INTEGER,
        description: DataTypes.STRING,
        code: DataTypes.STRING,
        price: DataTypes.FLOAT
    });

    return Orders;
};