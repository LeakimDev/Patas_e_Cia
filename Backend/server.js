const app = require("./src/app");
const config = require("./src/config/config");

app.listen(config.port, () => {
  console.log(
    `${config.nomeClinica} rodando em http://localhost:${config.port}`,
  );
});
