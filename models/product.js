const { DataTypes, Model } = require("sequelize");
const { all } = require("../server");

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
        category_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "categories",
            key: "id",
          },
        },
<<<<<<< Updated upstream
=======
        store_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: "stores",
            key: "id",
          },
        },
>>>>>>> Stashed changes
      },
      {
        sequelize,
        modelName: "product",
        tableName: "products",
      },
    );
    return Product;
  }

  static associate(models) {
    Product.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

module.exports = Product;
