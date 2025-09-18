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
  }
);

// Importar modelos
const User = require("./user");
const Category = require("./category");
const Product = require("./product");
const Order = require("./order");
const OrderItem = require("./OrderItem");
const Payment = require("./Payment");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Log = require("./log");

// Inicializar modelos
User.initModel(sequelize);
Category.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);
OrderItem.initModel(sequelize);
Payment.initModel(sequelize);
Cart.initModel(sequelize);
CartItem.initModel(sequelize);
Log.initModel(sequelize);

// Definir relaciones
// 🔹 Users
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Log, { foreignKey: "user_id" });
Log.belongsTo(User, { foreignKey: "user_id" });

// 🔹 Categories ↔ Products
Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

// 🔹 Orders ↔ OrderItems
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

// 🔹 Products ↔ OrderItems
Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

// 🔹 Orders ↔ Payments
Order.hasMany(Payment, { foreignKey: "order_id" });
Payment.belongsTo(Order, { foreignKey: "order_id" });

// 🔹 Cart ↔ CartItems
Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

// 🔹 Products ↔ CartItems
Product.hasMany(CartItem, { foreignKey: "product_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Payment,
  Cart,
  CartItem,
  Log,
};
