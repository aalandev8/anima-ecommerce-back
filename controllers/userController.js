const bcrypt = require("bcrypt");
const { User } = require("../models");
const { sendResponse, generateToken } = require("../middlewares/auth");

const userController = {
  test: (req, res) => {
    return sendResponse(res, 200, true, "UserController funcionando!");
  },

  register: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      // Validación simple
      if (!email || !password) {
        return sendResponse(res, 400, false, "Email y password son requeridos");
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return sendResponse(res, 400, false, "El email ya está registrado");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email,
        password: hashedPassword,
        role: role || "user",
      });

      const userInfo = {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      };

      return sendResponse(res, 201, true, "Usuario registrado exitosamente", userInfo);
    } catch (error) {
      return sendResponse(res, 500, false, "Error interno del servidor", error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return sendResponse(res, 400, false, "Email y password son requeridos");
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return sendResponse(res, 404, false, "Usuario no encontrado");
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return sendResponse(res, 401, false, "Credenciales inválidas");
      }

      const token = generateToken(user);

      const userInfo = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      return sendResponse(res, 200, true, "Login exitoso", { user: userInfo, token });
    } catch (error) {
      return sendResponse(res, 500, false, "Error interno del servidor", error.message);
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
      if (!user) {
        return sendResponse(res, 404, false, "Usuario no encontrado");
      }
      return sendResponse(res, 200, true, "Usuario obtenido correctamente", user);
    } catch (error) {
      return sendResponse(res, 500, false, "Error interno del servidor", error.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return sendResponse(res, 404, false, "Usuario no encontrado");
      }

      const { email, password, role } = req.body;

      if (password) {
        req.body.password = await bcrypt.hash(password, 10);
      }

      await user.update({ email, password: req.body.password, role });

      const updatedUser = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
      });

      return sendResponse(res, 200, true, "Usuario actualizado correctamente", updatedUser);
    } catch (error) {
      return sendResponse(res, 500, false, "Error interno del servidor", error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return sendResponse(res, 404, false, "Usuario no encontrado");
      }

      await user.destroy();
      return sendResponse(res, 200, true, "Usuario eliminado correctamente");
    } catch (error) {
      return sendResponse(res, 500, false, "Error interno del servidor", error.message);
    }
  },
};

module.exports = userController;
