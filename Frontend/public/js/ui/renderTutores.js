import { escapeHtml, criarEstadoVazio } from "./dom.js";

function criarCardTutor(tutor, { onEditar, onExcluir, onVerAnimais }) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = tutor.id;

  card.innerHTML = `
    <div class="card__info">
      <h3 class="card__nome">${escapeHtml(tutor.nome)}</h3>
      <p class="card__detalhe"><span class="icon">📞</span> ${escapeHtml(tutor.telefone)}</p>
      ${tutor.email ? `<p class="card__detalhe"><span class="icon">✉️</span> ${escapeHtml(tutor.email)}</p>` : ""}
      ${tutor.endereco ? `<p class="card__detalhe"><span class="icon">📍</span> ${escapeHtml(tutor.endereco)}</p>` : ""}
    </div>
    <div class="card__acoes">
      <button class="btn btn--outline btn--sm btn-animais" title="Ver animais">🐾 Animais</button>
      <button class="btn btn--secondary btn--sm btn-editar" title="Editar tutor">✏️ Editar</button>
      <button class="btn btn--danger btn--sm btn-excluir" title="Excluir tutor">🗑️ Excluir</button>
    </div>
  `;

  card.querySelector(".btn-animais").addEventListener("click", () => onVerAnimais(tutor));
  card.querySelector(".btn-editar").addEventListener("click", () => onEditar(tutor));
  card.querySelector(".btn-excluir").addEventListener("click", () => onExcluir(tutor));

  return card;
}

export function renderizarTutores(container, tutores, callbacks) {
  container.innerHTML = "";

  if (!tutores.length) {
    container.appendChild(
      criarEstadoVazio({
        texto: "Nenhum tutor cadastrado ainda.",
        subtexto: 'Clique em "Novo Tutor" para começar.',
      })
    );
    return;
  }

  const fragment = document.createDocumentFragment();
  tutores.forEach((tutor) => {
    fragment.appendChild(criarCardTutor(tutor, callbacks));
  });
  container.appendChild(fragment);
}
