const { Pool } = require("pg");
require("dotenv").config();

// Configuração explícita para debugging
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === "production",
};

// Log para debugging (remova em produção)
console.log("Configuração DB (ocultando senha):", {
  ...dbConfig,
  password: dbConfig.password ? "******" : undefined,
});

// Verifica se as credenciais essenciais estão definidas
if (!dbConfig.user || !dbConfig.password || !dbConfig.database) {
  console.error("⚠️ Configurações de banco de dados incompletas!");
  console.error(
    "Verifique se DB_USER, DB_PASSWORD e DB_NAME estão definidos no arquivo .env"
  );
}

const pool = new Pool(dbConfig);

pool.on("error", (err) => {
  console.error("Erro inesperado no pool de conexões do PostgreSQL", err);
  process.exit(-1);
});

module.exports = pool;
