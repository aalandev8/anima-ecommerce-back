const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./database.js");

const express = require("express");
const cors = require("cors");

const authRoutes = require("../routes/authRoutes");
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(express.json());
app.use('/api/categories', categoryRoutes);
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/auth", authRoutes);

// Las rutas vamos a importarlas asi
// const userRoutes = require('./routes/usuarios.routes');

// app.use('/usuarios', userRoutes); // activar cuando tengamos las rutas

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
        <p><a href="/postres">Ver Postres</a></p>
      </div>
    </body>
    </html>
  `);
});

// Conexión a la DB y sincronización de tablas
const PORT = process.env.APP_PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("DB conectada");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error DB:", err));

module.exports = app;
