const router = require("express").Router();

// Importação das rotas específicas
const usuariosRoutes = require("./usuarios.routes");
const produtosRoutes = require("./produtos.routes");
const clientesRoutes = require("./clientes.routes");
const pedidosRoutes = require("./pedidos.routes"); // Adicionado

// Configuração das rotas
router.use("/usuarios", usuariosRoutes);
router.use("/produtos", produtosRoutes);
router.use("/clientes", clientesRoutes);
router.use("/pedidos", pedidosRoutes); // Adicionado

// Rota de verificação de saúde da API
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});
module.exports = router; // Exportação da rota principal
