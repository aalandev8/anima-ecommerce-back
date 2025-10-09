

const express = require("express");
const { authenticateToken, requireAdmin } = require("../middlewares/auth");
const userController = require("../controllers/userController");

router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", authenticateToken, userController.getUser);
router.put("/:id", authenticateToken, userController.updateUser);
router.delete("/:id", authenticateToken, requireAdmin, userController.deleteUser);

module.exports = router;
