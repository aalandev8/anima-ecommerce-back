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
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false
      }
    );
    return User;
  }
}

module.exports = User;
