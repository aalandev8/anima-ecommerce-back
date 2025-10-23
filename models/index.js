const sequelize = require("../database.js");

const Category = require("./category");
const Product = require("./product");
const User = require("./User");
const Store = require("./store");

// Inicializar modelos
Category.initModel(sequelize);
Product.initModel(sequelize);
User.initModel(sequelize);
Store.initModel(sequelize);


const models = {
  Category,
  Product,
  User,
  Store,
  sequelize,
};

// Ejecutar asociaciones
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;
