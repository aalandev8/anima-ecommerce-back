const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// crea la orden
router.post("/", orderController.createOrder);

// obtiene todas las órdenes
router.get("/", orderController.getAllOrders);

// me da  una orden por ID
router.get("/:id", orderController.getOrderById);

// actualiza una orden
router.put("/:id", orderController.updateOrder);

// elimina una orden
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
