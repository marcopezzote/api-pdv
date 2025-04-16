const config = require("../../config/env");

module.exports = (err, req, res, next) => {
  const statusCodes = err.statusCodes || 500;
  const errorMessage = err.message || "Internal Server Error";

  // Log detalhado para desenvolvimento
  if (config.NODE_ENV !== "production") {
    console.error(`❌ ${statusCode} - ${errorMessage}`);
    console.error(err.stack);
  } else {
    // Log simplificado para produção
    console.error(`❌ ${statusCode} - ${errorMessage}`);
  }

  // Resposta ao cliente
  res.status(statusCode).json({
    status: "error",
    message:
      config.NODE_ENV === "production" && statusCode === 500
        ? "Internal Server Error"
        : errorMessage,
  });
};
