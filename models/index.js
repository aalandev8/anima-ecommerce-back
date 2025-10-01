const sequelize = require("../database.js");

const Category = require("./category");
const Product = require("./product");
const User = require("./User");
const Order = require("./order");

Category.initModel(sequelize);
Product.initModel(sequelize);
User.initModel(sequelize);
Order.initModel(sequelize);

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
  Order,
};
