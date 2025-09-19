const { Sequelize } = require("sequelize");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("../routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

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

<<<<<<< HEAD
const User = require("./User");
const Article = require("./Article");

=======
// Importar modelos
const User = require("./user");
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");

// Inicializar modelos
>>>>>>> main
User.initModel(sequelize);
Category.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);

<<<<<<< HEAD
=======
// Definir relaciones
// 🔹 Users
User.hasMany(Order);
Order.belongsTo(User);

// 🔹 Categories ↔ Products
Category.hasMany(Product);
Product.belongsTo(Category);

>>>>>>> main
module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Order,
};
