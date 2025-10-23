const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController"); // 🔧 corregido

// Crea una orden
router.post("/", orderController.createOrder);

// Obtiene todas las órdenes
router.get("/", orderController.getAllOrders);

// Obtiene una orden por ID
router.get("/:id", orderController.getOrderById);

// Actualiza una orden
router.put("/:id", orderController.updateOrder);

// Elimina una orden
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
