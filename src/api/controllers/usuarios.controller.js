const { APIError } = require("../utils/errors");

exports.cadastrar = async (req, res, next) => {
  try {
    const usuario = await usuarioService.cadastrar(req.body);
    res.status(201).json({
      status: "success",
      message: "Usuário cadastrado com sucesso",
      data: usuario,
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
