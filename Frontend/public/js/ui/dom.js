export function escapeHtml(valor) {
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function criarEstadoVazio({ texto, subtexto }) {
  const div = document.createElement("div");
  div.className = "estado-vazio";
  div.innerHTML = `
    <span class="estado-vazio__icone">🐾</span>
    <p class="estado-vazio__texto">${escapeHtml(texto)}</p>
    <p class="estado-vazio__subtexto">${escapeHtml(subtexto)}</p>
  `;
  return div;
}

export function alternarLoading(loadingEl, listaEl, visivel) {
  loadingEl.hidden = !visivel;
  listaEl.hidden = visivel;
}
