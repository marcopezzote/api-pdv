const pool = require("../connection");
const bcrypt = require("bcrypt");

async function seedData() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    console.log("🌱 Iniciando inserção de dados iniciais...");

    // Inserir usuário administrador padrão
    const senhaHash = await bcrypt.hash("Senha@123", 10);
    await client.query(
      `
      INSERT INTO usuarios (nome, email, senha)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
    `,
      ["Administrador", "admin@exemplo.com", senhaHash]
    );
    console.log("✅ Usuário administrador criado");

    // Inserir categorias iniciais
    const categorias = [
      "Informática",
      "Celulares",
      "Beleza e Perfumaria",
      "Mercado",
      "Livros e Papelaria",
      "Brinquedos",
      "Moda",
      "Bebê",
      "Games",
    ];

    for (const categoria of categorias) {
      await client.query(
        `
        INSERT INTO categorias (descricao)
        VALUES ($1)
        ON CONFLICT (descricao) DO NOTHING
      `,
        [categoria]
      );
    }
    console.log("✅ Categorias iniciais inseridas");

    // Inserir produtos de exemplo
    const produtos = [
      {
        descricao: "Teclado mecânico",
        valor: 22990,
        categoria: "Informática",
        estoque: 12,
      },
      {
        descricao: "Mouse sem fio",
        valor: 9990,
        categoria: "Informática",
        estoque: 23,
      },
      {
        descricao: 'Monitor LED 24"',
        valor: 79990,
        categoria: "Informática",
        estoque: 5,
      },
      {
        descricao: "Smartphone XYZ",
        valor: 149990,
        categoria: "Celulares",
        estoque: 8,
      },
      {
        descricao: "Perfume Elegance",
        valor: 15990,
        categoria: "Beleza e Perfumaria",
        estoque: 15,
      },
      {
        descricao: "Caderno Universitário",
        valor: 1990,
        categoria: "Livros e Papelaria",
        estoque: 50,
      },
    ];

    for (const produto of produtos) {
      // Buscar ID da categoria
      const { rows } = await client.query(
        "SELECT id FROM categorias WHERE descricao = $1",
        [produto.categoria]
      );
      if (rows.length > 0) {
        const categoriaId = rows[0].id;
        await client.query(
          `
          INSERT INTO produtos (descricao, valor, quantidade_estoque, categoria_id)
          VALUES ($1, $2, $3, $4)
        `,
          [produto.descricao, produto.valor, produto.estoque, categoriaId]
        );
      }
    }
    console.log("✅ Produtos de exemplo inseridos");

    // Inserir cliente de exemplo
    await client.query(
      `
      INSERT INTO clientes (nome, email, cpf, telefone)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
    `,
      ["Cliente Exemplo", "cliente@exemplo.com", "12345678900", "11999999999"]
    );
    console.log("✅ Cliente de exemplo inserido");

    await client.query("COMMIT");
    console.log("🎉 Todos os dados iniciais foram inseridos com sucesso!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Erro ao inserir dados iniciais:", error);
    throw error;
  } finally {
    client.release();
  }
}

// Executar a migração quando chamado diretamente
if (require.main === module) {
  seedData()
    .then(() => {
      console.log("✅ Seed concluído");
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Falha no seed:", err);
      process.exit(1);
    });
}

module.exports = { seedData };
