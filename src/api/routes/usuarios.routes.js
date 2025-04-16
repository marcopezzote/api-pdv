const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Rotas públicas
router.post("/", usuariosController.cadastrar);
router.post("/login", usuariosController.autenticar);

// Rotas protegidas
router.get("/", authMiddleware, usuariosController.listar);
router.get("/perfil", authMiddleware, usuariosController.obterPerfil);
router.put("/", authMiddleware, usuariosController.atualizar);

module.exports = router;
