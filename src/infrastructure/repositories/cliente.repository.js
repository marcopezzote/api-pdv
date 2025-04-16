const pool = require("../database/connection");
const { DatabaseError } = require("../../utils/errors");

exports.criar = async (cliente) => {
  try {
    const {
      nome,
      email,
      cpf,
      telefone,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    } = cliente;
    const query = `
      INSERT INTO clientes (nome, email, cpf, telefone, cep, rua, numero, bairro, cidade, estado)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;

    const valores = [
      nome,
      email,
      cpf,
      telefone,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    ];
    const { rows } = await pool.query(query, valores);
    return rows[0];
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw new DatabaseError("Não foi possível criar o cliente");
  }
};

exports.buscarPorEmail = async (email) => {
  try {
    const query = "SELECT * FROM clientes WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao buscar cliente por email:", error);
    throw new DatabaseError("Erro ao buscar cliente");
  }
};

exports.buscarPorCpf = async (cpf) => {
  try {
    const query = "SELECT * FROM clientes WHERE cpf = $1";
    const { rows } = await pool.query(query, [cpf]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao buscar cliente por CPF:", error);
    throw new DatabaseError("Erro ao buscar cliente");
  }
};

exports.buscarPorId = async (id) => {
  try {
    const query = "SELECT * FROM clientes WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao buscar cliente por ID:", error);
    throw new DatabaseError("Erro ao buscar cliente");
  }
};

exports.listar = async () => {
  try {
    const query = "SELECT * FROM clientes";
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    throw new DatabaseError("Erro ao listar clientes");
  }
};

exports.atualizar = async (id, dados) => {
  try {
    // Construir query dinâmica baseada nos dados fornecidos
    const campos = Object.keys(dados).filter((key) => dados[key] !== undefined);
    if (campos.length === 0) return await this.buscarPorId(id);

    const sets = campos
      .map((campo, index) => `${campo} = $${index + 1}`)
      .join(", ");
    const valores = campos.map((campo) => dados[campo]);

    const query = `
      UPDATE clientes 
      SET ${sets}, updated_at = NOW() 
      WHERE id = $${valores.length + 1}
      RETURNING *
    `;

    const { rows } = await pool.query(query, [...valores, id]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    throw new DatabaseError("Não foi possível atualizar o cliente");
  }
};
