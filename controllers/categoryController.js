const { Category, Product } = require("../models");

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll({ include: [Product] });
      res.status(200).json({
        success: true,
        data: categories,
        message: "Categorías obtenidas correctamente",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id, { include: [Product] });
      if (!category) {
        return res.status(404).json({ success: false, message: "Categoría no encontrada" });
      }
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      if (!req.body.name) {
        return res.status(400).json({ success: false, message: "El nombre es obligatorio" });
      }
      const category = await Category.create(req.body);
      res.status(201).json({
        success: true,
        data: category,
        message: "Categoría creada correctamente",
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const [updated] = await Category.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const category = await Category.findByPk(req.params.id);
        return res.status(200).json({
          success: true,
          data: category,
          message: "Categoría actualizada correctamente",
        });
      }
      res.status(404).json({ success: false, message: "Categoría no encontrada" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const deleted = await Category.destroy({ where: { id: req.params.id } });
      if (deleted) {
        return res
          .status(200)
          .json({ success: true, message: "Categoría eliminada correctamente" });
      }
      res.status(404).json({ success: false, message: "Categoría no encontrada" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = categoryController;
