const Order = require("../models/order");

const orderController = {
  // Crear nueva orden (asociada al usuario logueado)
  createOrder: async (req, res) => {
    try {
      const { items, total, status } = req.body;
      const newOrder = await Order.create({
        items,
        total,
        status,
        user_id: req.user.id, // ✅ Asociamos la orden al usuario
      });
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error al crear orden:", error);
      res.status(500).json({ error: "No se pudo crear la orden" });
    }
  },

  // Obtener órdenes
  getAllOrders: async (req, res) => {
    try {
      let orders;

      if (req.user.role === "admin") {
        // Admin ve todas las órdenes
        orders = await Order.findAll();
      } else {
        // Cliente solo ve sus propias órdenes
        orders = await Order.findAll({ where: { user_id: req.user.id } });
      }

      res.json(orders);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      res.status(500).json({ error: "No se pudieron obtener las órdenes" });
    }
  },

  // Obtener orden por ID
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) return res.status(404).json({ error: "Orden no encontrada" });

      // Solo admin o dueño de la orden puede verla
      if (req.user.role !== "admin" && order.user_id !== req.user.id) {
        return res.status(403).json({ error: "No tienes permiso para ver esta orden" });
      }

      res.json(order);
    } catch (error) {
      console.error("Error al obtener orden:", error);
      res.status(500).json({ error: "No se pudo obtener la orden" });
    }
  },

  // Actualizar orden (solo admin)
  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const { items, total, status } = req.body;

      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ error: "Orden no encontrada" });

      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Solo admins pueden actualizar órdenes" });
      }

      await order.update({ items, total, status });
      res.json(order);
    } catch (error) {
      console.error("Error al actualizar orden:", error);
      res.status(500).json({ error: "No se pudo actualizar la orden" });
    }
  },

  // Eliminar orden (solo admin)
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ error: "Orden no encontrada" });

      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Solo admins pueden eliminar órdenes" });
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
