const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        lastname: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
        password: { type: DataTypes.STRING(200), allowNull: false },
        phone: { type: DataTypes.STRING(20) },
        address: { type: DataTypes.TEXT },
        role: {
          type: DataTypes.ENUM("admin", "client"),
          allowNull: false,
          defaultValue: "client"
        },
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
    User.hasOne(models.Store, {
      foreignKey: "admin_id",
      as: "store",
    });
  }
}

module.exports = User;
