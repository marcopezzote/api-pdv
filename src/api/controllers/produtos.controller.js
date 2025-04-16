const produtoService = require("../../domain/services/produto.service");

exports.cadastrar = async (req, res, next) => {
  try {
    const produto = await produtoService.cadastrar(req.body);
    res.status(201).json({
      status: "success",
      message: "Produto cadastrado com sucesso",
      data: { produto },
    });
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const { categoria_id } = req.query;
    const produtos = await produtoService.listar(categoria_id);
    res.status(200).json({
      status: "success",
      data: { produtos },
    });
  } catch (error) {
    next(error);
  }
};

exports.detalhar = async (req, res, next) => {
  try {
    const produto = await produtoService.buscarPorId(req.params.id);
    res.status(200).json({
      status: "success",
      data: { produto },
    });
  } catch (error) {
    next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const produto = await produtoService.atualizar(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      message: "Produto atualizado com sucesso",
      data: { produto },
    });
  } catch (error) {
    next(error);
  }
};

exports.excluir = async (req, res, next) => {
  try {
    await produtoService.excluir(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Produto excluído com sucesso",
    });
  } catch (error) {
    next(error);
  }
};
