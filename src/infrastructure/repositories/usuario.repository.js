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
    throw new DatabaseError("Erro ao criar usuário", error);
  }
};

exports.buscarPorEmail = async (email) => {
  try {
    const query = `
                SELECT *
                FROM usuarios
                WHERE email = $1
            `;

    const { rows } = await pool.query(query, [email]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao buscar usuário por e-mail:", error);
    throw new DatabaseError("Erro ao buscar usuário por e-mail", error);
  }
};
