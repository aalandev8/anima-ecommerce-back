const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateToken, sendResponse } = require("../middlewares/authMiddleware");

async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return sendResponse(res, 400, false, "El email ya está registrado");

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || "client" });

    return sendResponse(res, 201, true, "Usuario registrado correctamente", {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, "Error al registrar usuario");
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return sendResponse(res, 400, false, "Usuario no encontrado");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return sendResponse(res, 401, false, "Credenciales inválidas");

    const token = generateToken(user);
    return sendResponse(res, 200, true, "Login exitoso", { token, role: user.role });
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, "Error al iniciar sesión");
  }
}

module.exports = { register, login };
