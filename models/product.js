const { DataTypes, Model } = require("sequelize");

class Product extends Model {
  static initModel(sequelize) {
    Product.init({
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      category_id: { type: DataTypes.INTEGER.UNSIGNED },
      name: { type: DataTypes.STRING(150), allowNull: false },
      description: { type: DataTypes.TEXT },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      stock: { type: DataTypes.INTEGER, defaultValue: 0 },
      image_url: { type: DataTypes.TEXT },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: false
    });
    return Product;
  }
}

module.exports = Product;
