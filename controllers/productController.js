const { Product, Category } = require("../models");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
      });
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { category_id: req.params.categoryId },
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const category = await Category.findByPk(req.body.category_id);
      if (!category) {
        return res.status(400).json({ message: "Categoría no encontrada" });
      }

      const product = await Product.create(req.body);
      const productWithCategory = await Product.findByPk(product.id, {
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
      });
      res.status(201).json(productWithCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      if (req.body.category_id) {
        const category = await Category.findByPk(req.body.category_id);
        if (!category) {
          return res.status(400).json({ message: "Categoría no encontrada" });
        }
      }

      const [updated] = await Product.update(req.body, {
        where: { id: req.params.id },
      });

      if (updated) {
        const product = await Product.findByPk(req.params.id, {
          include: [
            {
              model: Category,
              as: "category",
            },
          ],
        });
        res.json(product);
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deleted = await Product.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = productController;
