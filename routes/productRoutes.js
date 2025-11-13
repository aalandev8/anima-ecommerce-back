const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { validateProduct, validateId } = require("../middlewares/validation");
const { authenticateToken, requireAdmin } = require("../middlewares/auth");

// ✅ Obtener todos los productos (con filtros y paginación)
router.get("/", productController.getAllProducts);

// ✅ Obtener productos por tienda
router.get("/store/:storeId/products", productController.getProductsByStore);

// ✅ Obtener producto por ID
router.get("/:id", validateId, productController.getProductById);

// ADMIN CRUD
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  validateProduct,
  productController.createProduct
);

router.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  validateId,
  productController.updateProduct
);

router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  validateId,
  productController.deleteProduct
);

module.exports = router;
