const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { APIError } = require("../../utils/errors");
const usuarioRepository = require("../../infrastructure/repositories/usuario.repository");
const config = require("../../../config/env");

exports.cadastrar = async (dadosUsuario) => {
  const { nome, email, senha } = dadosUsuario;

  // Verifica se o usuário já existe
  const usuarioExiste = await usuarioRepository.buscarPorEmail(email);
  if (usuarioExiste) {
    throw new APIError("Este e-mail já está em uso", 400);
  }

  // Hash da senha
  const senhaHash = await bcrypt.hash(senha, 10);

  // Cria o usuário
  const usuario = await usuarioRepository.criar({
    nome,
    email,
    senha: senhaHash,
  });

  // Remove a senha antes de retornar
  delete usuario.senha;
  return usuario;
};
exports.autenticar = async (email, senha) => {
  // Verifica se o usuário existe
  const usuario = await usuarioRepository.buscarPorEmail(email);
  if (!usuario) {
    throw new APIError("E-mail ou senha inválidos", 401);
  }

  // Verifica a senha
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    throw new APIError("E-mail ou senha inválidos", 401);
  }

  // Gera o token JWT
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    config.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );

  // Remove a senha antes de retornar
  delete usuario.senha;

  return { usuario, token };
};
