const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticateToken } = require("../middlewares/authMiddleware"); // auth

// 🟢 Crear una orden (solo usuarios logueados)
router.post("/", authenticateToken, orderController.createOrder);

// 🟢 Obtener todas las órdenes del usuario (cliente) o todas (admin)
router.get("/", authenticateToken, orderController.getAllOrders);

// 🟢 Obtener una orden por ID (solo dueño de la orden o admin)
router.get("/:id", authenticateToken, orderController.getOrderById);

// 🔒 Actualizar una orden (solo admin)
router.put("/:id", authenticateToken, orderController.updateOrder);

// 🔒 Eliminar una orden (solo admin)
router.delete("/:id", authenticateToken, orderController.deleteOrder);

module.exports = router;
