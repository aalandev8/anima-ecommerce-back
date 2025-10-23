const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
        password: { type: DataTypes.STRING(200), allowNull: false },
        phone: { type: DataTypes.STRING(20) },
        address: { type: DataTypes.TEXT },
      },
      {
        sequelize,
        modelName: "user",
        tableName: "users",
      },
    );
    return User;
  }

  static associate(models) {
    // Un usuario admin puede tener una tienda
    User.hasOne(models.Store, {
      foreignKey: "admin_id",
      as: "store",
    });
  }
}

module.exports = User;
