const { DataTypes, Model } = require("sequelize");

class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        items: { type: DataTypes.JSON },
        total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        status: { type: DataTypes.STRING(50), defaultValue: "pendiente" },
      },
      {
        sequelize,
        modelName: "order",
        tableName: "orders",
      },
    );
    return Order;
  }
}

module.exports = Order;
