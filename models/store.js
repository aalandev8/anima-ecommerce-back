const { DataTypes, Model } = require("sequelize");

class Store extends Model {
  static initModel(sequelize) {
    Store.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(150), allowNull: false },
        description: { type: DataTypes.TEXT },
        address: { type: DataTypes.STRING(255), allowNull: false },
        phone: { type: DataTypes.STRING(20) },
        email: { type: DataTypes.STRING(150), validate: { isEmail: true } },
        image_url: { type: DataTypes.TEXT },
        type: {
          type: DataTypes.ENUM("celiac", "kosher", "vegan", "vegetarian", "organic"),
          allowNull: false,
          defaultValue: "celiac",
        },
        admin_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "store",
        tableName: "stores",
      },
    );
    return Store;
  }

  static associate(models) {
    Store.belongsTo(models.User, {
      foreignKey: "admin_id",
      as: "admin",
    });

    Store.hasMany(models.Product, {
      foreignKey: "store_id",
      as: "products",
    });
  }
}

module.exports = Store;
