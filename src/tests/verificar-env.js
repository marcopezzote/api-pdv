// Adicionar esta linha no início do arquivo
require("dotenv").config();

console.log("Verificando variáveis de ambiente:");
console.log("Localização atual:", process.cwd());
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD definido?", !!process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

// Verificar se o dotenv está encontrando o arquivo .env
const fs = require("fs");
const path = require("path");
const envPath = path.resolve(process.cwd(), ".env");
console.log("Arquivo .env existe?", fs.existsSync(envPath));
