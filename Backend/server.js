const app = require("./src/app");
const config = require("./src/config/config");
const { popularSeVazio } = require("./src/database/seed");

if (process.env.SEED_DEMO === "true") popularSeVazio();

app.listen(config.port, () => {
  console.log(
    `${config.nomeClinica} rodando em http://localhost:${config.port}`,
  );
});
