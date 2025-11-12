require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./database.js");

const app = express();

// 🧠 Middleware base
app.use(express.json());

// ✅ CORS dinámico (detecta frontend y dashboard automáticamente)
app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir peticiones sin "origin" (por ejemplo desde Postman o el mismo servidor)
      if (!origin) return callback(null, true);

      // Permitir cualquier localhost con cualquier puerto (frontend, dashboard, etc.)
      if (/^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
        return callback(null, true);
      }

      // También permitir los dominios definidos explícitamente
      const allowedOrigins = [
        "http://localhost:3000", // React clásico
        "http://localhost:5173", // Frontend Vite
        "http://localhost:5174", // Dashboard Vite
      ];

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Bloquear todo lo que no esté permitido
      return callback(new Error("No permitido por CORS: " + origin));
    },
    credentials: true,
  })
);

// 📦 Rutas principales
const routes = require("./routes");
routes(app);

// 🌐 Página de bienvenida (no se toca)
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

// ⚠️ Middleware de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
    availableRoutes: ["/", "/api/status"],
  });
});

// ⚠️ Middleware de errores
app.use((error, req, res, next) => {
  console.error("❌ Error:", error);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
});

// 🚀 Configuración del puerto
const PORT = process.env.APP_PORT || process.env.PORT || 3000;

// 🗄️ Conexión con base de datos y arranque del servidor
sequelize
  .authenticate()
  .then(() => {
    console.log("Base de datos conectada");
    return sequelize.sync();
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

module.exports = app;
