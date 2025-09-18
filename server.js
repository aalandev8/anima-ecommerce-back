const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Descomentar cuando tengas database.js configurado
// const sequelize = require("./database.js");

// Descomentar cuando tengamos las rutas listas
// const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Activar cuando tengamos las rutas
// app.use("/usuarios", userRoutes);

app.get("/usuarios/test", (req, res) => {
  res.json({
    success: true,
    message: "UserController test funcionando! 🚀",
    note: "Esta es una ruta temporal. Para funcionalidad completa, implementar routes/userRoutes.js",
    timestamp: new Date().toISOString(),
  });
});

app.post("/usuarios/login", (req, res) => {
  res.json({
    success: true,
    message: "Login endpoint funcionando (temporal)",
    note: "Implementar lógica real en controllers/userController.js",
    receivedData: req.body,
  });
});

app.post("/usuarios/register", (req, res) => {
  res.json({
    success: true,
    message: "Register endpoint funcionando (temporal)",
    note: "Implementar lógica real en controllers/userController.js",
    receivedData: req.body,
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
    availableRoutes: ["/", "/api/status", "/usuarios/test"],
  });
});

app.use((error, req, res, next) => {
  console.error("❌ Error:", error);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
});

const PORT = process.env.APP_PORT || process.env.PORT || 3000;

// Versión simple.
app.listen(PORT, () => {
  console.log("\n =====================================");
  console.log(`   SERVIDOR INICIADO CORRECTAMENTE`);
  console.log(" =====================================");
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Hora: ${new Date().toLocaleString()}`);
  console.log(" Rutas disponibles:");
  console.log(`   • GET  http://localhost:${PORT}/`);
  console.log(`   • GET  http://localhost:${PORT}/api/status`);
  console.log(`   • GET  http://localhost:${PORT}/usuarios/test`);
  console.log(`   • POST http://localhost:${PORT}/usuarios/login`);
  console.log(`   • POST http://localhost:${PORT}/usuarios/register`);
  console.log(" =====================================");
  console.log("Base de datos deshabilitada temporalmente");
  console.log("Para habilitar BD, configurar database.js");
  console.log(" =====================================\n");
});

// Versión de base de datos (comentada hasta que esté configurada)
/*
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
*/

module.exports = app;
