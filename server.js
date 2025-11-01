require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./database.js");

const app = express();
app.use(express.json());
app.use(cors({ 
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true 
}));

// Importar rutas de los modelos
const routes = require("./routes"); // Rutas generales para otros modelos

// Configurar las rutas
routes(app); // Todas las rutas (incluyendo stores)

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
          width: 400px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,.1);
        }
        .endpoints {
          text-align: left;
          margin-top: 20px;
        }
        .endpoints li {
          margin: 8px 0;
        }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>🍰 Pastelería API</h1>
        <p>Bienvenido a la API de la pastelería.</p>
        <div class="endpoints">
          <h3>Endpoints disponibles:</h3>
          <ul>
            <li><strong>Auth:</strong> POST /api/auth/login</li>
            <li><strong>Categories:</strong> GET /api/categories</li>
            <li><strong>Products:</strong> GET /api/products</li>
            <li><strong>Users:</strong> GET /api/users</li>
            <li><strong>Articles:</strong> GET /api/articles</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Ruta no encontrada
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
    availableRoutes: ["/", "/api/status"],
  });
});

// Manejador de errores
app.use((error, req, res, next) => {
  console.error("❌ Error:", error);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
});

const PORT = process.env.APP_PORT || process.env.PORT || 3000;


// ✅ Solo dejar activo este bloque, porque ya maneja la conexión a la BD y el arranque del servidor.
sequelize
  .authenticate()
  .then(() => {
    console.log("Base de datos conectada");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor con BD corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error de base de datos:", err);
    console.log("Iniciando servidor sin BD...");
    app.listen(PORT, () => {
      console.log(`Servidor SIN BD corriendo en puerto ${PORT}`);
    });
  });


// ❌ Esta parte causa conflicto porque intenta iniciar el servidor nuevamente.
// ❌ Comentada para evitar el error “EADDRINUSE: address already in use”.
/*
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}
*/

module.exports = app;
