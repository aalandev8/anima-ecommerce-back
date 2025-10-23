const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  validateProduct,
  validateProductUpdate,
  validateId,
  validateCategoryId,
} = require("../middlewares/validation");

// Rutas RESTful para productos
router.get("/", productController.getAllProducts);
router.get("/category/:categoryId", validateCategoryId, productController.getProductsByCategory);
router.get("/:id", validateId, productController.getProductById);
router.post("/", validateProduct, productController.createProduct);
router.put("/:id", validateId, validateProductUpdate, productController.updateProduct);
router.delete("/:id", validateId, productController.deleteProduct);

module.exports = router;
