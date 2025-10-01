const express = require("express");
const { register, login } = require("../controllers/authController");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Demasiados intentos, espera un rato",
});

router.post("/register", register);
router.post("/login", loginLimiter, login);

module.exports = router;
