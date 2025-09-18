const sendResponse = (res, statusCode, success, message, data = null) => {};

const authenticateToken = async (req, res, next) => {};

const requireAdmin = (req, res, next) => {};

const generateToken = (user) => {};

module.exports = { sendResponse, authenticateToken, requireAdmin, generateToken };
