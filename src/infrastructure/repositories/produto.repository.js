const pool = require("../database/connection");
const { DatabaseError } = require("../../utils/errors");

exports.criar = async (produto) => {
  try {
    const { descricao, quantidade_estoque, valor, categoria_id } = produto;
    const query = `
      INSERT INTO produtos (descricao, quantidade_estoque, valor, categoria_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const { rows } = await pool.query(query, [
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    ]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw new DatabaseError("Não foi possível criar o produto");
  }
};

exports.listar = async (categoriaId = null) => {
  try {
    let query = `
      SELECT p.*, c.descricao as categoria_nome
      FROM produtos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
    `;

    let params = [];

    if (categoriaId) {
      query += ` WHERE p.categoria_id = $1`;
      params.push(categoriaId);
    }

    const { rows } = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    throw new DatabaseError("Erro ao listar produtos");
  }
};

exports.buscarPorId = async (id) => {
  try {
    const query = `
      SELECT p.*, c.descricao as categoria_nome
      FROM produtos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      WHERE p.id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    throw new DatabaseError("Erro ao buscar produto");
  }
};

exports.verificarCategoria = async (categoriaId) => {
  try {
    const query =
      "SELECT EXISTS(SELECT 1 FROM categorias WHERE id = $1) as existe";
    const { rows } = await pool.query(query, [categoriaId]);
    return rows[0].existe;
  } catch (error) {
    console.error("Erro ao verificar categoria:", error);
    throw new DatabaseError("Erro ao verificar categoria");
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
      UPDATE produtos 
      SET ${sets}, updated_at = NOW() 
      WHERE id = $${valores.length + 1}
      RETURNING *
    `;

    const { rows } = await pool.query(query, [...valores, id]);
    return rows[0];
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw new DatabaseError("Não foi possível atualizar o produto");
  }
};

exports.excluir = async (id) => {
  try {
    const query = "DELETE FROM produtos WHERE id = $1";
    await pool.query(query, [id]);
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    throw new DatabaseError("Não foi possível excluir o produto");
  }
};
