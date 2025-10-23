const sequelize = require("../database.js");

const Category = require("./category");
const Product = require("./product");
const User = require("./User");
const Store = require("./store");

Category.initModel(sequelize);
Product.initModel(sequelize);
User.initModel(sequelize);
Store.initModel(sequelize);

// Asociaciones
Category.hasMany(Product, {
  foreignKey: "category_id",
  as: "products",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

Store.hasMany(Product, {
  foreignKey: "store_id",
  as: "products",
});

Product.belongsTo(Store, {
  foreignKey: "store_id",
  as: "store",
});

module.exports = {
  sequelize,
  Category,
  Product,
  User,
  Store,
};
