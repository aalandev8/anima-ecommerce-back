const { User } = require("../models");

async function index(req, res) {}

async function show(req, res) {}

async function store(req, res) {}

async function update(req, res) {}

async function destroy(req, res) {}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};

const { sendResponse, generateToken } = require("../middlewares/auth");

const login = async (req, res) => {
  try {
    return sendResponse(res, 200, true, "Login exitoso", {
      user: userInfo,
      token: generateToken(user),
    });
  } catch (error) {
    return sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const { sendResponse, generateToken } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const userController = {
  test: (req, res) => {
    return sendResponse(res, 200, true, "UserController funcionando!");
  },

  login: async (req, res) => {
    // Aquí va a ir la lógica de login:
    // - Buscar usuario por email
    // - Comparar contraseñas
    // - Generar token
    // - Responder
  },

  // ... más funciones
};

module.exports = userController;
