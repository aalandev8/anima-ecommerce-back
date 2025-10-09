const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const {
  validateCategory,
  validateCategoryUpdate,
  validateId,
} = require("../middlewares/validation");

router.get("/", categoryController.getAllCategories);
router.get("/:id", validateId, categoryController.getCategoryById);
router.post("/", validateCategory, categoryController.createCategory);
router.put("/:id", validateId, validateCategoryUpdate, categoryController.updateCategory);
router.delete("/:id", validateId, categoryController.deleteCategory);

module.exports = router;
