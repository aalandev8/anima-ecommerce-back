const { Product, Category } = require("../models");
const { Op } = require("sequelize");

const productController = {
  // ✅ Obtener todos los productos (con filtrado y paginación)
  getAllProducts: async (req, res) => {
    try {
      const { category = "all", page = 1, limit = 6 } = req.query;
      const offset = (page - 1) * limit;

      // Configuración base del include
      const includeConfig = [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ];

      // Filtrar por categoría si no es "all"
      if (category && category.toLowerCase() !== "all") {
        includeConfig[0].where = {
          name: { [Op.iLike]: `%${category}%` },
        };
      }

      // Consulta con paginación
      const { count, rows } = await Product.findAndCountAll({
        include: includeConfig,
        limit: parseInt(limit),
        offset: parseInt(offset),
        distinct: true,
        order: [["id", "ASC"]],
      });

      // Formatear productos
      const products = rows.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        image: p.image || "/images/default-food.jpg",
        category: p.category ? p.category.name : null,
      }));

      // Enviar respuesta estructurada
      res.json({
        products,
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // ✅ Obtener producto por ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [{ model: Category, as: "category" }],
      });

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      res.json({
        ...product.toJSON(),
        image: product.image || "/images/default-food.jpg",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ✅ Crear producto
  createProduct: async (req, res) => {
    try {
      const category = await Category.findByPk(req.body.category_id);
      if (!category) {
        return res.status(400).json({ message: "Categoría no encontrada" });
      }

      const product = await Product.create(req.body);
      const productWithCategory = await Product.findByPk(product.id, {
        include: [{ model: Category, as: "category" }],
      });

      res.status(201).json({
        ...productWithCategory.toJSON(),
        image: productWithCategory.image || "/images/default-food.jpg",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // ✅ Actualizar producto
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
          include: [{ model: Category, as: "category" }],
        });

        res.json({
          ...product.toJSON(),
          image: product.image || "/images/default-food.jpg",
        });
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // ✅ Eliminar producto
  deleteProduct: async (req, res) => {
    try {
      const deleted = await Product.destroy({
        where: { id: req.params.id },
      });

      if (deleted) return res.status(204).send();
      res.status(404).json({ message: "Producto no encontrado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = productController;



