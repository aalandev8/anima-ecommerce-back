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

const User = require("./User");
const Article = require("./Article");

User.initModel(sequelize);
Article.initModel(sequelize);

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Order,
};
