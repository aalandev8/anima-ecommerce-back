const { Product, Category } = require("../models");
const { Op } = require("sequelize");

const productController = {

  // -----------------------------------------
  // 1) OBTENER TODOS LOS PRODUCTOS + FILTRO + PÁGINAS
  // -----------------------------------------
  getAllProducts: async (req, res) => {
    try {
      const { category = "all", page = 1, limit = 6 } = req.query;
      const offset = (page - 1) * limit;

      const includeConfig = [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ];

      if (category && category.toLowerCase() !== "all") {
        includeConfig[0].where = {
          name: { [Op.iLike]: `%${category}%` },
        };
      }

      const { count, rows } = await Product.findAndCountAll({
        include: includeConfig,
        limit: parseInt(limit),
        offset: parseInt(offset),
        distinct: true,
        order: [["id", "ASC"]],
      });

      const products = rows.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        image: p.image || "/images/default-food.jpg",
        category: p.category ? p.category.name : null,
      }));

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


  // -----------------------------------------
  // 2) OBTENER PRODUCTOS POR TIENDA (LA FUNCIÓN QUE FALTABA)
  // -----------------------------------------
  getProductsByStore: async (req, res) => {
    try {
      const { storeId } = req.params;

      const products = await Product.findAll({
        where: { store_id: storeId },
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
        order: [["id", "ASC"]],
      });

      res.json({
        data: products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  // -----------------------------------------
  // 3) OBTENER PRODUCTO POR ID
  // -----------------------------------------
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


  // -----------------------------------------
  // 4) CREAR PRODUCTO
  // -----------------------------------------
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


  // -----------------------------------------
  // 5) ACTUALIZAR PRODUCTO
  // -----------------------------------------
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


  // -----------------------------------------
  // 6) ELIMINAR PRODUCTO
  // -----------------------------------------
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



