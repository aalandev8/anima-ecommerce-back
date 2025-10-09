const { sendResponse, generateToken } = require("../middlewares/authMiddleware");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const userController = {
  // Función de prueba
  test: (req, res) => {
    return sendResponse(res, 200, true, "UserController funcionando");
  },

  register: async (req, res) => {
    try {
      const { nombre, apellido, email, password, role = "buyer" } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return sendResponse(res, 400, false, "El email ya está registrado");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        nombre,
        apellido,
        email,
        password: hashedPassword,
        role,
      });

      const token = generateToken(newUser);

      return sendResponse(res, 201, true, "Usuario registrado exitosamente", {
        user: {
          id: newUser.id,
          nombre: newUser.nombre,
          apellido: newUser.apellido,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      });
    } catch (error) {
      console.error("Error en registro:", error);
      return sendResponse(res, 500, false, "Error interno del servidor");
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return sendResponse(res, 401, false, "Credenciales inválidas");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return sendResponse(res, 401, false, "Credenciales inválidas");
      }

      const token = generateToken(user);

      return sendResponse(res, 200, true, "Login exitoso", {
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error("Error en login:", error);
      return sendResponse(res, 500, false, "Error interno del servidor");
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params;

      if (parseInt(id) !== req.user.id && req.user.role !== "admin") {
        return sendResponse(res, 403, false, "Sin permisos para ver estos datos");
      }

      const user = await User.findByPk(id);
      if (!user) {
        return sendResponse(res, 404, false, "Usuario no encontrado");
      }

      return sendResponse(res, 200, true, "Usuario encontrado", {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return sendResponse(res, 500, false, "Error interno del servidor");
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido, password } = req.body;

      if (parseInt(id) !== req.user.id && req.user.role !== "admin") {
        return sendResponse(res, 403, false, "Sin permisos para actualizar");
      }

      const user = await User.findByPk(id);
      if (!user) {
        return sendResponse(res, 404, false, "Usuario no encontrado");
      }

      const updateData = {};
      if (nombre) updateData.nombre = nombre;
      if (apellido) updateData.apellido = apellido;
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      await user.update(updateData);

      return sendResponse(res, 200, true, "Usuario actualizado exitosamente", {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return sendResponse(res, 500, false, "Error interno del servidor");
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      if (req.user.role !== "admin") {
        return sendResponse(res, 403, false, "Solo administradores pueden eliminar usuarios");
      }

      const user = await User.findByPk(id);
      if (!user) {
        return sendResponse(res, 404, false, "Usuario no encontrado");
      }

      if (parseInt(id) === req.user.id) {
        return sendResponse(res, 400, false, "No puedes eliminar tu propia cuenta");
      }

      await user.destroy();

      return sendResponse(res, 200, true, "Usuario eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return sendResponse(res, 500, false, "Error interno del servidor");
    }
  },
};

module.exports = userController;
