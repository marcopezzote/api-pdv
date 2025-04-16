const express = require("express");
const router = express.Router();

// Importação das rotas específicas
const usuariosRoutes = require("./usuarios.routes");
const clientesRoutes = require("./clientes.routes");
const produtosRoutes = require("./produtos.routes");

// Configuração das rotas
router.use("/usuarios", usuariosRoutes);
router.use("/clientes", clientesRoutes);
router.use("/produtos", produtosRoutes);

// Rota de verificação de saúde da API
router.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

module.exports = router;
