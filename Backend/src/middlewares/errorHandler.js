//tratamemento centralizado de erros da aplicação

const AppError = require("../errors/appError");

/** 404 para rotas /api que não existem. */
function rotaNaoEncontrada(req, res) {
  res
    .status(404)
    .json({ erro: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
}

// O Express reconhece um middleware de erro pelos 4 parâmetros (err, req, res, next).
// eslint-disable-next-line no-unused-vars
function tratarErros(err, req, res, next) {
  if (err instanceof AppError) {
    return res
      .status(err.status)
      .json({ erro: err.message, detalhes: err.detalhes });
  }

  // JSON malformado no corpo da requisição.
  if (err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ erro: "O corpo da requisição não é um JSON válido." });
  }

  // Segunda barreira: o banco recusou apagar um registro que tem dependentes.
  const violouChaveEstrangeira = /FOREIGN KEY constraint failed/i.test(
    err.message,
  );
  if (violouChaveEstrangeira) {
    return res
      .status(409)
      .json({ erro: "Operação bloqueada: existem registros relacionados." });
  }

  console.error("Erro inesperado:", err); // fica no log do servidor, não vai para o usuário
  return res
    .status(500)
    .json({ erro: "Erro interno do servidor. Tente novamente mais tarde." });
}

module.exports = { rotaNaoEncontrada, tratarErros };
