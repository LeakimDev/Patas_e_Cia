//utilitários para os controladores

const AppError = require("../errors/appError");

/** Lê um parâmetro numérico da URL (ex.: /tutores/:id) ou lança erro 400. */
function lerIdDaRota(req, nomeParametro) {
  const id = Number(req.params[nomeParametro]);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(
      400,
      `Identificador inválido: "${req.params[nomeParametro]}".`,
    );
  }
  return id;
}

module.exports = { lerIdDaRota };
