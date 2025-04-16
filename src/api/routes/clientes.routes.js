const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientes.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Todas as rotas de clientes são protegidas
router.use(authMiddleware);

router.post("/", clientesController.cadastrar);
router.get("/", clientesController.listar);
router.get("/:id", clientesController.detalhar);
router.put("/:id", clientesController.atualizar);

module.exports = router;
