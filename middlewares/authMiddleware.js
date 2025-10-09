const jwt = require("jsonwebtoken");

const sendResponse = (res, statusCode, success, message, data = null) => {
  const response = { success, message };
  if (data) response.data = data;

  return res.status(statusCode).json(response);
};

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return sendResponse(res, 401, false, "Token requerido");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return sendResponse(res, 401, false, "Token inválido");
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return sendResponse(res, 403, false, "Permisos de administrador requeridos");
  }
  next();
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = {
  sendResponse,
  authenticateToken,
  requireAdmin,
  generateToken,
};
