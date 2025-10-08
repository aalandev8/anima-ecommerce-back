const Order = require("../models/order");

const orderController = {
  // para crear  una nueva orden
  createOrder: async (req, res) => {
    try {
      const { items, total, status } = req.body;
      const newOrder = await Order.create({ items, total, status });
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error al crear orden:", error);
      res.status(500).json({ error: "No se pudo crear la orden" });
    }
  },

  // obtine todas las órdenes
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      res.status(500).json({ error: "No se pudieron obtener las órdenes" });
    }
  },

  // obtiene una orden por id
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ error: "Orden no encontrada" });
      }

      res.json(order);
    } catch (error) {
      console.error("Error al obtener orden:", error);
      res.status(500).json({ error: "No se pudo obtener la orden" });
    }
  },

  // actualiza una orden
  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const { items, total, status } = req.body;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: "Orden no encontrada" });
      }

      await order.update({ items, total, status });
      res.json(order);
    } catch (error) {
      console.error("Error al actualizar orden:", error);
      res.status(500).json({ error: "No se pudo actualizar la orden" });
    }
  },

  // elimina una orden
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ error: "Orden no encontrada" });
      }

      await order.destroy();
      res.json({ message: "Orden eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar orden:", error);
      res.status(500).json({ error: "No se pudo eliminar la orden" });
    }
  },
};

module.exports = orderController;
