export function limparErrosCampo() {
  document.querySelectorAll(".campo-erro").forEach((el) => {
    el.textContent = "";
    el.closest(".form-grupo")?.classList.remove("form-grupo--erro");
  });
}

export function exibirErrosCampo(erros, prefixoId = "erro-") {
  limparErrosCampo();
  Object.entries(erros).forEach(([campo, mensagem]) => {
    const erroEl = document.getElementById(`${prefixoId}${campo}`);
    if (!erroEl) return;
    erroEl.textContent = mensagem;
    erroEl.closest(".form-grupo")?.classList.add("form-grupo--erro");
  });
}
