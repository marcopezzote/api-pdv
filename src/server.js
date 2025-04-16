const app = require("./app");
const config = require("./config/env");
const pool = require("./infrastructure/database/connection");

async function startServer() {
  try {
    // Testa a conexão com o banco de dados
    await pool.query("SELECT NOW()");
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso.");

    // Inicia o servidor
    app.listen(config.PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${config.PORT}`);
      console.log(`📝 Ambiente: ${config.NODE_ENV}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
}
startServer();
