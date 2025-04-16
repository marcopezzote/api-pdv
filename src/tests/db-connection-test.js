const pool = require("../infrastructure/database/connection");

async function testarConexaoDB() {
  try {
    console.log("🔍 Testando conexão com o banco de dados...");
    const resultado = await pool.query("SELECT NOW() as now");
    console.log(
      `✅ Conexão bem-sucedida! Horário do servidor: ${resultado.rows[0].now}`
    );

    // Verifica se as tabelas existem
    console.log("\n🔍 Verificando tabelas do banco de dados...");
    const { rows } = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log("\n📋 Tabelas encontradas:");
    rows.forEach((row) => console.log(`- ${row.table_name}`));

    if (rows.length === 0) {
      console.warn(
        "\n⚠️ Nenhuma tabela encontrada. Verifique se as migrações foram executadas."
      );
    }

    await pool.end();
  } catch (error) {
    console.error("\n❌ Erro ao conectar ao banco de dados:", error.message);
    process.exit(1);
  }
}

// Execute se for chamado diretamente
if (require.main === module) {
  testarConexaoDB();
}

module.exports = testarConexaoDB;
