const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Importamos la conexión y todos los modelos
const { sequelize } = require("./models/index");
const User = require("./models/user");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Log = require("./models/log");
const CartItem = require("./models/cartItem");

const app = express();

app.use(cors());
app.use(express.json());

// Inicializar modelos
User.initModel(sequelize);
Category.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);
Log.initModel(sequelize);
CartItem.initModel(sequelize);

// Ruta principal
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pastelería API</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          background-color: #fdf6f0; 
          text-align: center; 
          padding-top: 40px;
        }
        h1 { color: #d77a61; }
        .box {
          background: white;
          padding: 20px;
          margin: auto;
          width: 300px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,.1);
        }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>🍰 Pastelería API</h1>
        <p>Bienvenido a la API de la pastelería.</p>
      </div>
    </body>
    </html>
  `);
});

// Conexión a la DB y sincronización de tablas
const PORT = process.env.APP_PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB conectada correctamente");

    // ⚡ Sincroniza tablas según modelos sin borrar datos
    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar DB:", error);
  }
};

startServer();

module.exports = app;
