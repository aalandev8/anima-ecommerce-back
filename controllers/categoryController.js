const { Category, Product } = require("../models");

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const [updated] = await Category.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const category = await Category.findByPk(req.params.id);
        res.json(category);
      } else {
        res.status(404).json({ message: "Categoría no encontrada" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const deleted = await Category.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Categoría no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = categoryController;
