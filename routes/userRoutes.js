const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/*
 * API endpoints relacionados a los usuarios.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/users",
 * tal como se definió en el archivo `routes/index.js`.
 */

// routes/userRoutes.js

const express = require("express");

const { authenticateToken, requireAdmin } = require("../middlewares/auth");

const userController = require("../controllers/userController");

router.get("/test", userController.test);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/:id", userController.getUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
