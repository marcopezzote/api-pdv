const { createTables } = require("./001_create_tables");
const { seedData } = require("./002_insert_seed_data");
const pool = require("../connection");

async function runMigrations() {
  try {
    console.log("🚀 Iniciando processo de migração do banco de dados...");

    // Criar tabelas
    await createTables();

    // Inserir dados iniciais
    await seedData();

    console.log("✅ Migração do banco de dados concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante o processo de migração:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Executar migrações
runMigrations();
