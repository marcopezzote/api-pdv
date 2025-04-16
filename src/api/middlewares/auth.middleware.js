const jwt = require("jsonwebtoken");
const config = require("../../config/env");
const { ApiError } = require("../../utils/errors");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw new ApiError("Não autorizado! Token não fornecido", 401);
    }

    const [scheme, token] = authHeader.split(" ");

    if (!/^Bearer$/i.test(scheme)) {
      throw new ApiError("Formato de token inválido", 401);
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new ApiError("Token inválido ou expirado", 401);
      }

      req.usuario = {
        id: decoded.id,
        email: decoded.email,
      };
      next();
    });
  } catch (error) {
    next(error);
  }
};
