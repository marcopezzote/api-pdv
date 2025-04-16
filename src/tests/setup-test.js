const request = require("supertest");
const express = require("express");

// Criar um aplicativo Express de teste simplificado
const app = express();
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

async function testarAPI() {
  console.log("🧪 Iniciando testes básicos da API...");

  try {
    // Teste de saúde
    console.log("\n🔍 Testando rota de saúde...");
    const healthResponse = await request(app).get("/api/health");
    console.log(`Status: ${healthResponse.status}`);
    console.log(healthResponse.body);

    if (healthResponse.status !== 200) {
      throw new Error("Teste de saúde falhou!");
    }

    console.log("\n✅ Teste de saúde passado com sucesso!");
  } catch (error) {
    console.error("\n❌ Teste falhou:", error.message);
    process.exit(1);
  }
}

// Execute se for chamado diretamente
if (require.main === module) {
  testarAPI();
}

module.exports = testarAPI;
