// Este é um roteiro para testes manuais, não um arquivo para execução

/*
1. Teste de Saúde da API
GET /api/health
Resposta esperada:
{
  "status": "UP",
  "timestamp": "2025-04-16T00:32:41Z"
}

2. Cadastro de Usuário
POST /api/usuarios
Body:
{
  "nome": "Usuário Teste",
  "email": "teste@exemplo.com",
  "senha": "senha123"
}
Resposta esperada (201):
{
  "status": "success",
  "message": "Usuário cadastrado com sucesso",
  "data": {
    "usuario": {
      "id": 1,
      "nome": "Usuário Teste",
      "email": "teste@exemplo.com",
      "created_at": "2025-04-16T00:32:41Z"
    }
  }
}

3. Autenticação (Login)
POST /api/usuarios/login
Body:
{
  "email": "teste@exemplo.com",
  "senha": "senha123"
}
Resposta esperada (200):
{
  "status": "success",
  "message": "Login realizado com sucesso",
  "data": {
    "usuario": {
      "id": 1,
      "nome": "Usuário Teste",
      "email": "teste@exemplo.com"
    },
    "token": "jwt-token-aqui"
  }
}

4. Tentar acessar rota protegida sem token
GET /api/clientes
Resposta esperada (401):
{
  "status": "error",
  "message": "Não autorizado. Token não fornecido."
}

5. Acessar rota protegida com token
GET /api/clientes
Headers:
Authorization: Bearer {token-obtido-no-login}
Resposta esperada (200):
{
  "status": "success",
  "data": {
    "clientes": []
  }
}

# Teste de conexão com o banco de dados
node src/tests/db-connection-test.js

# Teste automatizado da API
node src/tests/setup-test.js

# Alternativamente, se estiver usando Jest:
# Adicione este script ao package.json:
# "scripts": {
#   "test": "jest"
# }

# E então execute:
# npm test
*/
