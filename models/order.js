const { DataTypes, Model } = require("sequelize");

class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        user_id: {
          type: DataTypes.INTEGER.UNSIGNED, // igual que User.id
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        },
        total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        status: { type: DataTypes.STRING(50), defaultValue: "pendiente" },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
      },
      {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        timestamps: false
      }
    );
    return Order;
  }
}

module.exports = Order;
