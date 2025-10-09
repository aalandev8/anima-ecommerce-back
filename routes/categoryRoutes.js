const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const {
  validateCategory,
  validateCategoryUpdate,
  validateId,
} = require("../middlewares/validation");
const { authenticateToken, requireAdmin } = require("../middlewares/authMiddleware");

router.get("/", categoryController.getAllCategories);
router.get("/:id", validateId, categoryController.getCategoryById);

router.post(
  "/",
  authenticateToken,
  requireAdmin,
  validateCategory,
  categoryController.createCategory,
);
router.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  validateId,
  validateCategoryUpdate,
  categoryController.updateCategory,
);
router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  validateId,
  categoryController.deleteCategory,
);

module.exports = router;
