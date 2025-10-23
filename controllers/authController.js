const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let usuarios = [];

async function register(req, res) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    if (usuarios.some((u) => u.email === email)) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = {
      id: usuarios.length + 1,
      email,
      password: hashedPassword,
      role: role || "user",
    };

    usuarios.push(nuevoUsuario);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: { id: nuevoUsuario.id, email: nuevoUsuario.email, role: nuevoUsuario.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const usuario = usuarios.find((u) => u.email === email);
    if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) return res.status(401).json({ message: "Credenciales inválidas" });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Error interno: falta JWT_SECRET" });
    }

    const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login exitoso", token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
}

module.exports = { register, login };
