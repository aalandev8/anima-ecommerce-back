const { Sequelize } = require("sequelize");

// Configuración conexión
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    logging: false,
  },
);

// Importar modelos
const User = require("./user");
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");

// Inicializar modelos
User.initModel(sequelize);
Category.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);

// Definir relaciones
// 🔹 Users
User.hasMany(Order);
Order.belongsTo(User);

// 🔹 Categories ↔ Products
Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Order,
};
