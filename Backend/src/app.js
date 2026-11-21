//liga: json -> arquivos estáticos -> rotas da API -> tratamento de erros

const path = require("path");
const express = require("express");
const routes = require("./routes");
const {
  rotaNaoEncontrada,
  tratarErros,
} = require("./middlewares/errorHandler");

const app = express();

// Habilita CORS para permitir requisições do frontend em outras portas (ex: 3001)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json()); // permite ler o corpo JSON enviado pelo front-end

// Interface: serve tudo que está na pasta /public (HTML, CSS, JS).
app.use(express.static(path.join(__dirname, "..", "..", "Frontend", "public")));
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res) => res.redirect("/pages/index.html"));

// Verificação de saúde (útil para a hospedagem saber se o app está no ar).
app.get("/saude", (req, res) => res.json({ status: "ok" }));

// API REST: todas as rotas começam com /api.
app.use("/api", routes);
app.use("/api", rotaNaoEncontrada);

app.use(tratarErros); // SEMPRE por último

module.exports = app;
