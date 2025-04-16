const usuarioService = require("../services/usuarios.service");

const { APIError } = require("../utils/errors");

exports.cadastrar = async (req, res, next) => {
  try {
    const usuario = await usuarioService.cadastrar(req.body);
    res.status(201).json({
      status: "success",
      message: "Usuário cadastrado com sucesso",
      data: { usuario },
    });
  } catch (error) {
    next(error);
  }
};

exports.autenticar = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      throw new APIError("Email e senha são obrigatórios", 400);
    }

    const { usuario, token } = await usuarioService.autenticar(email, senha);

    res.status(200).json({
      status: "success",
      message: "Login realizado com sucesso",
      data: {
        usuario,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const usuarios = await usuarioService.listar();
    res.status(200).json({
      status: "success",
      data: { usuarios },
    });
  } catch (error) {
    next(error);
  }
};

exports.obterPerfil = async (req, res, next) => {
  try {
    const usuario = await usuarioService.obterPerfil(req.usuario.id);
    res.status(200).json({
      status: "success",
      data: { usuario },
    });
  } catch (error) {
    next(error);
  }

  exports.atualizarPerfil = async (req, res, next) => {
    try {
      const usuario = await usuarioService.atualizarPerfil(
        req.usuario.id,
        req.body
      );
      res.status(200).json({
        status: "success",
        message: "Perfil atualizado com sucesso",
        data: { usuario },
      });
    } catch (error) {
      next(error);
    }
  };
};
