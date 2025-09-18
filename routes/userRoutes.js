const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/*
 * API endpoints relacionados a los usuarios.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/users",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.get("/", userController.index);
router.post("/", userController.store);
router.get("/:id", userController.show);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;

const express = require("express");
const { authenticateToken, requireAdmin } = require("../middlewares/auth");
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", authenticateToken, userController.getUser);
router.put("/:id", authenticateToken, userController.updateUser);
router.delete("/:id", authenticateToken, requireAdmin, userController.deleteUser);

module.exports = router;
