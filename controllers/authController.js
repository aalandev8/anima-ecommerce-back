const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateToken, sendResponse } = require("../middlewares/auth");

async function register(req, res) {
  try {
    const { name, lastname, email, password, role = "client" } = req.body;

    if (!email || !password) {
      return sendResponse(res, 400, false, "Email y contraseña son requeridos");
    }

    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendResponse(res, 400, false, "El correo ya está registrado");
    }
if (!name || !lastname) {
  return res.status(400).json({ 
    error: "El nombre y apellido son obligatorios" 
  });
}
   
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = await User.create({
     name: name || "",
      lastname: lastname || "",
      email,
      password: hashedPassword,
      role,
    });

   
    const token = generateToken(newUser);

    return sendResponse(res, 201, true, "Usuario registrado exitosamente", {
      user: {
        id: newUser.id,
        name: newUser.name,
        lastname: newUser.lastname,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return sendResponse(res, 500, false, "Error en el registro", error.message);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, 400, false, "Email y contraseña son requeridos");
    }

   
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendResponse(res, 401, false, "Credenciales inválidas");
    }

    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return sendResponse(res, 401, false, "Credenciales inválidas");
    }

 
    const token = generateToken(user);

    return sendResponse(res, 200, true, "Login exitoso", {
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    return sendResponse(res, 500, false, "Error al iniciar sesión", error.message);
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return sendResponse(res, 404, false, "Usuario no encontrado");
    }

    return sendResponse(res, 200, true, "Usuario obtenido", {
      user: {
        id: user.id,
        name: user.name,
        apellido: user.apellido,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return sendResponse(res, 500, false, "Error al obtener usuario");
  }
}
module.exports = {
  register,
  login,
  getCurrentUser,
};