const clienteService = require("../../domain/services/cliente.service");

exports.cadastrar = async (req, res, next) => {
  try {
    const cliente = await clienteService.cadastrar(req.body);
    res.status(201).json({
      status: "success",
      message: "Cliente cadastrado com sucesso",
      data: { cliente },
    });
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const clientes = await clienteService.listar();
    res.status(200).json({
      status: "success",
      data: { clientes },
    });
  } catch (error) {
    next(error);
  }
};

exports.detalhar = async (req, res, next) => {
  try {
    const cliente = await clienteService.buscarPorId(req.params.id);
    res.status(200).json({
      status: "success",
      data: { cliente },
    });
  } catch (error) {
    next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const cliente = await clienteService.atualizar(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      message: "Cliente atualizado com sucesso",
      data: { cliente },
    });
  } catch (error) {
    next(error);
  }
};
