const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../../utils/errors");
const usuarioRepository = require("../../infrastructure/repositories/usuario.repository");
const config = require("../../config/env");

exports.cadastrar = async (dadosUsuario) => {
  const { nome, email, senha } = dadosUsuario;

  // Verificar se usuário já existe
  const usuarioExistente = await usuarioRepository.buscarPorEmail(email);
  if (usuarioExistente) {
    throw new ApiError("Este email já está em uso", 409);
  }

  // Hash da senha
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  // Criar usuário
  const usuario = await usuarioRepository.criar({
    nome,
    email,
    senha: senhaCriptografada,
  });

  // Remove senha antes de retornar
  delete usuario.senha;

  return usuario;
};

exports.autenticar = async (email, senha) => {
  // Buscar usuário
  const usuario = await usuarioRepository.buscarPorEmail(email);
  if (!usuario) {
    throw new ApiError("Credenciais inválidas", 401);
  }

  // Verificar senha
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    throw new ApiError("Credenciais inválidas", 401);
  }

  // Gerar token
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    config.JWT_SECRET,
    { expiresIn: "8h" }
  );

  // Remove senha antes de retornar
  delete usuario.senha;

  return { usuario, token };
};

exports.listar = async () => {
  const usuarios = await usuarioRepository.listar();
  return usuarios.map((usuario) => {
    delete usuario.senha;
    return usuario;
  });
};

exports.buscarPorId = async (id) => {
  const usuario = await usuarioRepository.buscarPorId(id);
  if (!usuario) {
    throw new ApiError("Usuário não encontrado", 404);
  }
  delete usuario.senha;
  return usuario;
};

exports.atualizar = async (id, dados) => {
  // Verificar se usuário existe
  const usuarioExistente = await usuarioRepository.buscarPorId(id);
  if (!usuarioExistente) {
    throw new ApiError("Usuário não encontrado", 404);
  }

  // Se estiver atualizando email, verificar se já está em uso
  if (dados.email && dados.email !== usuarioExistente.email) {
    const emailEmUso = await usuarioRepository.buscarPorEmail(dados.email);
    if (emailEmUso) {
      throw new ApiError("Este email já está em uso", 409);
    }
  }

  // Se estiver atualizando senha, fazer hash
  if (dados.senha) {
    dados.senha = await bcrypt.hash(dados.senha, 10);
  }

  // Atualizar usuário
  const usuario = await usuarioRepository.atualizar(id, dados);
  delete usuario.senha;

  return usuario;
};
