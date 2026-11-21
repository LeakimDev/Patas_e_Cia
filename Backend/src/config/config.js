const path = require("path");

module.exports = {
  port: process.env.PORT || 3000,
  caminhoBanco:
    process.env.DB_PATH ||
    path.join(__dirname, "..", "..", "data", "clinica.db"),
  nomeClinica: "Clínica Patas & Cia",
};
