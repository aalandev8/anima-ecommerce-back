const bcrypt = require("bcrypt");
const { User } = require("../models");
const { sendResponse, generateToken } = require("../middlewares/auth");

const userController = {
  // Función de prueba
  test: (req, res) => {
    return sendResponse(res, 200, true, "UserController funcionando");
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params;

      if (parseInt(id) !== req.user.id && req.user.role !== "admin") {
        return sendResponse(res, 403, false, "Sin permisos para ver estos datos");
      }

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return sendResponse(res, 404, false, "Usuario no encontrado");
      }

      return sendResponse(res, 200, true, "Usuario obtenido correctamente", user);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return sendResponse(res, 500, false, "Error interno del servidor", error.message);
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
