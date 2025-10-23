const express = require("express");
const router = express.Router();
const { authenticateToken, requireAdmin } = require("../middlewares/auth");
const userController = require("../controllers/userController");

/*
 * API endpoints relacionados a los usuarios.
 * Todos estos endpoints tienen como prefijo "/users",
 * tal como se definió en `routes/index.js`.
 */

// Ruta de prueba (opcional)
router.get("/test", userController.test);

// Registro y login
router.post("/register", userController.register);
router.post("/login", userController.login);

// Obtener, actualizar y eliminar usuario
router.get("/:id", authenticateToken, userController.getUser);
router.put("/:id", authenticateToken, userController.updateUser);
router.delete("/:id", authenticateToken, requireAdmin, userController.deleteUser);

module.exports = router;
