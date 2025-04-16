const pool = require("../database/connection");
const { DatabaseError } = require("../../utils/errors");

exports.criar = async (usuario) => {
  try {
    const { nome, email, senha } = usuario;
    const query = `
      INSERT INTO usuarios (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING id, nome, email, created_at
    `;

    const { rows } = await pool.query(query, [nome, email, senha]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw new DatabaseError("Não foi possível criar o usuário");
  }
};

exports.buscarPorEmail = async (email) => {
  try {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    throw new DatabaseError("Erro ao buscar usuário");
  }
};

exports.buscarPorId = async (id) => {
  try {
    const query = "SELECT * FROM usuarios WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    throw new DatabaseError("Erro ao buscar usuário");
  }
};

exports.listar = async () => {
  try {
    const query = "SELECT id, nome, email, created_at FROM usuarios";
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    throw new DatabaseError("Erro ao listar usuários");
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
      UPDATE usuarios 
      SET ${sets}, updated_at = NOW() 
      WHERE id = $${valores.length + 1}
      RETURNING id, nome, email, created_at, updated_at
    `;

    const { rows } = await pool.query(query, [...valores, id]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw new DatabaseError("Não foi possível atualizar o usuário");
  }
};
