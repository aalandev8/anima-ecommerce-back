const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  validateProduct,
  validateId,
  validateCategoryId,
} = require("../middlewares/validation");
const { authenticateToken, requireAdmin } = require("../middlewares/auth");

router.get("/", productController.getAllProducts);
router.get("/category/:categoryId", validateCategoryId, productController.getProductsByCategory);
router.get("/:id", validateId, productController.getProductById);

router.post("/", authenticateToken, requireAdmin, validateProduct, productController.createProduct);
router.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  validateId,
  validateProductUpdate,
  productController.updateProduct,
);
router.delete("/:id", authenticateToken, requireAdmin, validateId, productController.deleteProduct);

module.exports = router;
