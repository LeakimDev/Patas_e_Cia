const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Encaminha requisições da API para o servidor Backend
app.use("/api", async (req, res) => {
  const targetUrl = `${BACKEND_URL}/api${req.url}`;
  try {
    const fetchOptions = {
      method: req.method,
      headers: { ...req.headers, host: new URL(BACKEND_URL).host },
    };

    if (["POST", "PUT", "PATCH"].includes(req.method) && req.body && Object.keys(req.body).length > 0) {
      fetchOptions.headers["content-type"] = "application/json";
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    res.status(response.status);

    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!["content-encoding", "content-length", "transfer-encoding"].includes(lowerKey)) {
        res.setHeader(key, value);
      }
    });

    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(502).json({
      erro: "Nao foi possivel conectar ao servidor Backend na porta 3000.",
      detalhes: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.redirect("/pages/index.html");
});

app.listen(PORT, () => {
  console.log(`Patas & Cia Frontend rodando em http://localhost:${PORT}`);
});
