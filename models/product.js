const { DataTypes, Model } = require("sequelize");

class Product extends Model {
  static initModel(sequelize) {
    Product.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(150), allowNull: false },
        description: { type: DataTypes.TEXT },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        stock: { type: DataTypes.INTEGER, defaultValue: 0 },
        image_url: { type: DataTypes.TEXT },
      },
      {
        sequelize,
        modelName: "product",
        tableName: "products",
      },
    );
    return Product;
  }
}

module.exports = Product;
