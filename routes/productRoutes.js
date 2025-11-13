const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { validateProduct, validateId } = require("../middlewares/validation");
const { authenticateToken, requireAdmin } = require("../middlewares/auth");

// ✅ Rutas limpias y compatibles con el frontend
router.get("/", productController.getAllProducts);
router.get("/:id", validateId, productController.getProductById);

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
