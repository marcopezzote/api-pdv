const pool = require("../connection");

async function createTables() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    console.log("🔧 Iniciando criação de tabelas...");

    // Tabela de usuários
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabela "usuarios" criada');

    // Tabela de categorias
    await client.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        descricao VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabela "categorias" criada');

    // Tabela de produtos
    await client.query(`
      CREATE TABLE IF NOT EXISTS produtos (
        id SERIAL PRIMARY KEY,
        descricao VARCHAR(255) NOT NULL,
        quantidade_estoque INTEGER NOT NULL DEFAULT 0,
        valor INTEGER NOT NULL,
        categoria_id INTEGER REFERENCES categorias(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabela "produtos" criada');

    // Tabela de clientes
    await client.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        cpf VARCHAR(14) UNIQUE,
        telefone VARCHAR(20),
        cep VARCHAR(9),
        rua VARCHAR(255),
        numero VARCHAR(10),
        bairro VARCHAR(255),
        cidade VARCHAR(255),
        estado VARCHAR(2),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabela "clientes" criada');

    // Tabela de pedidos
    await client.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id SERIAL PRIMARY KEY,
        cliente_id INTEGER NOT NULL REFERENCES clientes(id),
        observacao TEXT,
        valor_total INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabela "pedidos" criada');

    // Tabela de itens do pedido
    await client.query(`
      CREATE TABLE IF NOT EXISTS pedido_produtos (
        id SERIAL PRIMARY KEY,
        pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
        produto_id INTEGER NOT NULL REFERENCES produtos(id),
        quantidade_produto INTEGER NOT NULL,
        valor_produto INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabela "pedido_produtos" criada');

    await client.query("COMMIT");
    console.log("🎉 Todas as tabelas foram criadas com sucesso!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Erro ao criar tabelas:", error);
    throw error;
  } finally {
    client.release();
  }
}

// Executar a migração quando chamado diretamente
if (require.main === module) {
  createTables()
    .then(() => {
      console.log("✅ Migração concluída");
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Falha na migração:", err);
      process.exit(1);
    });
}

module.exports = { createTables };
