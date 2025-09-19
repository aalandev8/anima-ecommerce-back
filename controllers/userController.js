const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

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
