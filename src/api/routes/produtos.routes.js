const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/produtos.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Todas as rotas de produtos são protegidas
router.use(authMiddleware);

router.post("/", produtosController.cadastrar);
router.get("/", produtosController.listar);
router.get("/:id", produtosController.detalhar);
router.put("/:id", produtosController.atualizar);
router.delete("/:id", produtosController.excluir);

module.exports = router;
