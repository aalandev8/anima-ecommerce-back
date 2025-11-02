const express = require("express");
const { register, login, getCurrentUser } = require("../controllers/authController");
const rateLimit = require("express-rate-limit");
const { authenticateToken: autenticateToken } = require("../middlewares/auth");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Demasiados intentos, espera un rato",
});

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.get("/me", autenticateToken, getCurrentUser);


module.exports = router;
