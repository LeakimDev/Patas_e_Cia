let timeoutId = null;

function getContainer() {
  let container = document.getElementById("mensagem-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "mensagem-container";
    document.body.prepend(container);
  }
  return container;
}

function exibir(texto, tipo) {
  const container = getContainer();
  clearTimeout(timeoutId);

  container.textContent = texto;
  container.className = `mensagem mensagem--${tipo} mensagem--visivel`;

  timeoutId = setTimeout(() => {
    container.className = "mensagem";
  }, 5000);
}

export const mensagens = {
  sucesso: (texto) => exibir(texto, "sucesso"),
  erro: (texto) => exibir(texto, "erro"),
  limpar: () => {
    const container = getContainer();
    clearTimeout(timeoutId);
    container.className = "mensagem";
  },
};
