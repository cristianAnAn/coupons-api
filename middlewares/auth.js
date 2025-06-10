// middlewares/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const issuer = process.env.JWT_ISSUER;
const audience = process.env.JWT_AUDIENCE;

// Middleware para verificar el token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      isSuccess: false,
      message: 'Token no proporcionado o formato inválido.',
      result: null
    });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, secret, { issuer, audience }, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        isSuccess: false,
        message: 'Token inválido o expirado.',
        result: null
      });
    }

    req.roles = decoded.roles || [];
    next();
  });
}

// Middleware para proteger por rol
function requireRole(requiredRole) {
  return (req, res, next) => {
    if (!req.roles || !req.roles.includes(requiredRole)) {
      return res.status(403).json({
        isSuccess: false,
        message: `Acceso denegado. Se requiere el rol: ${requiredRole}.`,
        result: null
      });
    }
    next();
  };
}

module.exports = {
  verifyToken,
  requireRole
};
