class AppError extends Error {
  constructor(status, mensagem, detalhes = {}) {
    super(mensagem);
    this.name = "AppError";
    this.status = status;
    this.detalhes = detalhes;
  }

  static validacao(detalhes) {
    return new AppError(
      400,
      "Existem campos inválidos. Corrija e tente novamente.",
      detalhes,
    );
  }
  static naoEncontrado(entidade) {
    return new AppError(404, `${entidade} não encontrado(a).`);
  }
  static conflito(mensagem) {
    return new AppError(409, mensagem);
  }
}

module.exports = AppError;
