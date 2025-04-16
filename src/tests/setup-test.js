const app = require("../app");
const request = require("supertest");

async function testarAPI() {
  console.log("🧪 Iniciando testes básicos da API...");

  try {
    // 1. Teste de saúde
    console.log("\n🔍 Testando rota de saúde...");
    const healthResponse = await request(app).get("/api/health");
    console.log(`Status: ${healthResponse.status}`);
    console.log(healthResponse.body);

    if (healthResponse.status !== 200) {
      throw new Error("Teste de saúde falhou!");
    }

    // 2. Teste de registro
    console.log("\n🔍 Testando registro de usuário...");
    const registroResponse = await request(app)
      .post("/api/usuarios")
      .send({
        nome: "Teste Automatizado",
        email: `teste-${Date.now()}@exemplo.com`,
        senha: "Senha@123",
      });

    console.log(`Status: ${registroResponse.status}`);
    console.log(registroResponse.body);

    if (registroResponse.status !== 201) {
      throw new Error("Teste de registro falhou!");
    }

    console.log("\n✅ Todos os testes disponíveis passaram com sucesso!");
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
