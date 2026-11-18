//liga: json -> arquivos estáticos -> rotas da API -> tratamento de erros

const path = require("path");
const express = require("express");
const routes = require("./routes");
const {
  rotaNaoEncontrada,
  tratarErros,
} = require("./middlewares/errorHandler");

const app = express();

app.use(express.json()); // permite ler o corpo JSON enviado pelo front-end

// Interface: serve tudo que está na pasta /public (HTML, CSS, JS).
app.use(express.static(path.join(__dirname, "..", "public")));

// Verificação de saúde (útil para a hospedagem saber se o app está no ar).
app.get("/saude", (req, res) => res.json({ status: "ok" }));

// API REST: todas as rotas começam com /api.
app.use("/api", routes);
app.use("/api", rotaNaoEncontrada);

app.use(tratarErros); // SEMPRE por último

module.exports = app;
