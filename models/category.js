const { DataTypes, Model } = require("sequelize");

class Category extends Model {
  static initModel(sequelize) {
    Category.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        description: { type: DataTypes.TEXT },
      },
      {
        sequelize,
        modelName: "category",
        tableName: "categories",
      },
    );
    return Category;
  }
}

module.exports = Category;
