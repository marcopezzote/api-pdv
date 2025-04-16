// Teste básico da API

const app = require("../app");
const request = require("supertest");

async function testarAPI() {
  console.log("🧪 Iniciando testes básicos da API...");
  cons;
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

    // 3. Teste de login
    console.log("\n🔍 Testando login de usuário...");
    const loginResponse = await request(app).post("/api/usuarios/login").send({
      email: registroResponse.body.data.usuario.email,
      senha: "Senha@123",
    });

    console.log(`Status: ${loginResponse.status}`);
    console.log(loginResponse.body);

    if (loginResponse.status !== 200 || !loginResponse.body.data.token) {
      throw new Error("Teste de login falhou!");
    }

    const token = loginResponse.body.data.token;

    // 4. Teste de rota protegida
    console.log("\n🔍 Testando acesso a rota protegida...");
    const rotaProtegidaResponse = await request(app)
      .get("/api/clientes")
      .set("Authorization", `Bearer ${token}`);

    console.log(`Status: ${rotaProtegidaResponse.status}`);
    console.log(rotaProtegidaResponse.body);

    if (rotaProtegidaResponse.status !== 200) {
      throw new Error("Teste de rota protegida falhou!");
    }

    console.log("\n✅ Todos os testes passaram com sucesso!");
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
