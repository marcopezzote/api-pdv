const { ApiError } = require("../../utils/errors");
const produtoRepository = require("../../infrastructure/repositories/produto.repository");

exports.cadastrar = async (dadosProduto) => {
  // Verifica se a categoria existe
  if (dadosProduto.categoria_id) {
    const categoriaExiste = await produtoRepository.verificarCategoria(
      dadosProduto.categoria_id
    );
    if (!categoriaExiste) {
      throw new ApiError("Categoria não encontrada", 404);
    }
  }

  return await produtoRepository.criar(dadosProduto);
};

exports.listar = async (categoriaId) => {
  return await produtoRepository.listar(categoriaId);
};

exports.buscarPorId = async (id) => {
  const produto = await produtoRepository.buscarPorId(id);
  if (!produto) {
    throw new ApiError("Produto não encontrado", 404);
  }
  return produto;
};

exports.atualizar = async (id, dados) => {
  // Verificar se produto existe
  const produtoExistente = await produtoRepository.buscarPorId(id);
  if (!produtoExistente) {
    throw new ApiError("Produto não encontrado", 404);
  }

  // Se estiver atualizando categoria, verifica se existe
  if (dados.categoria_id) {
    const categoriaExiste = await produtoRepository.verificarCategoria(
      dados.categoria_id
    );
    if (!categoriaExiste) {
      throw new ApiError("Categoria não encontrada", 404);
    }
  }

  return await produtoRepository.atualizar(id, dados);
};

exports.excluir = async (id) => {
  // Verificar se produto existe
  const produtoExistente = await produtoRepository.buscarPorId(id);
  if (!produtoExistente) {
    throw new ApiError("Produto não encontrado", 404);
  }

  await produtoRepository.excluir(id);
};
