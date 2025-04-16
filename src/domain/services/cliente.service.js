const { ApiError } = require("../../utils/errors");
const clienteRepository = require("../../infrastructure/repositories/cliente.repository");

exports.cadastrar = async (dadosCliente) => {
  const { email, cpf } = dadosCliente;

  // Verificar se já existe cliente com este email
  if (email) {
    const clienteExistente = await clienteRepository.buscarPorEmail(email);
    if (clienteExistente) {
      throw new ApiError("Este email já está em uso", 409);
    }
  }

  // Verificar se já existe cliente com este CPF
  if (cpf) {
    const clienteExistente = await clienteRepository.buscarPorCpf(cpf);
    if (clienteExistente) {
      throw new ApiError("Este CPF já está cadastrado", 409);
    }
  }

  // Criar cliente
  return await clienteRepository.criar(dadosCliente);
};

exports.listar = async () => {
  return await clienteRepository.listar();
};

exports.buscarPorId = async (id) => {
  const cliente = await clienteRepository.buscarPorId(id);
  if (!cliente) {
    throw new ApiError("Cliente não encontrado", 404);
  }
  return cliente;
};

exports.atualizar = async (id, dados) => {
  // Verificar se cliente existe
  const clienteExistente = await clienteRepository.buscarPorId(id);
  if (!clienteExistente) {
    throw new ApiError("Cliente não encontrado", 404);
  }

  // Se estiver atualizando email, verificar se já está em uso
  if (dados.email && dados.email !== clienteExistente.email) {
    const emailEmUso = await clienteRepository.buscarPorEmail(dados.email);
    if (emailEmUso) {
      throw new ApiError("Este email já está em uso", 409);
    }
  }

  // Se estiver atualizando CPF, verificar se já está em uso
  if (dados.cpf && dados.cpf !== clienteExistente.cpf) {
    const cpfEmUso = await clienteRepository.buscarPorCpf(dados.cpf);
    if (cpfEmUso) {
      throw new ApiError("Este CPF já está cadastrado", 409);
    }
  }

  // Atualizar cliente
  return await clienteRepository.atualizar(id, dados);
};
