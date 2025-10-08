const sequelize = require("../database.js");

const Product = require("./Product");
const User = require("./User");

Category.initModel(sequelize);
Product.initModel(sequelize);
User.initModel(sequelize);

Category.hasMany(Product, {
  foreignKey: "category_id",
  as: "products",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

module.exports = {
  sequelize,
  Category,
  Product,
  User,
};
