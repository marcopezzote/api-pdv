const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarios.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Rotas públicas
router.post("/", usuarioController.cadastrar);
router.post("/login", usuarioController.autenticar);

// Rotas protegidas
router.get("/", authMiddleware, usuarioController.listar);
router.get("/perfil", authMiddleware, usuarioController.obterPerfil);
router.put("/", authMiddleware, usuarioController.atualizarPerfil);

module.exports = router;
