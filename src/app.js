const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./api/routes");
const errorHandler = require("./api/middlewares/errorHandler");

const app = express();

// Middlewares de segurança e utilidade
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rotas da API
app.use("/api", routes);

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
