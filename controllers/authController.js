const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let usuarios = [];

async function register(req, res) {
  const { email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const nuevoUsuario = { id: usuarios.length + 1, email, password: hashedPassword, role };
  usuarios.push(nuevoUsuario);

  res
    .status(201)
    .json({ message: "Usuario registrado", usuario: { id: nuevoUsuario.id, email, role } });
}

async function login(req, res) {
  const { email, password } = req.body;
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) return res.status(401).json({ message: "Credenciales inválidas" });

  const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ message: "Login exitoso", token });
}

module.exports = { register, login };
