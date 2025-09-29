const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  validateProduct,
  validateProductUpdate,
  validateId,
  validateCategoryId,
} = require("../middleware/validation");

router.get("/", productController.getAllProducts);
router.get("/category/:categoryId", validateCategoryId, productController.getProductsByCategory);
router.get("/:id", validateId, productController.getProductById);
router.post("/", validateProduct, productController.createProduct);
router.put("/:id", validateId, productController.updateProduct);
router.delete("/:id", validateId, productController.deleteProduct);

module.exports = router;
