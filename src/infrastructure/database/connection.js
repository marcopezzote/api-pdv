const { Pool } = require("pg");
const config = require("../../config/env");

const pool = new Pool({
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  ssl: config.NODE_ENV === "production",
});

pool.on("error", (err) => {
  console.error("Erro inesperado no pool de conexões do PostgreSQL", err);
  process.exit(-1);
});

module.exports = pool;
