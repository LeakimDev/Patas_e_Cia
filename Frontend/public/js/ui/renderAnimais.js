import { escapeHtml, criarEstadoVazio } from "./dom.js";

const ESPECIES_EMOJI = {
  cachorro: "🐶",
  gato: "🐱",
  "pássaro": "🐦",
  passaro: "🐦",
  coelho: "🐰",
  hamster: "🐹",
  peixe: "🐠",
  "réptil": "🦎",
  reptil: "🦎",
};

function getEmoji(especie) {
  return ESPECIES_EMOJI[especie?.toLowerCase()] ?? "🐾";
}

function formatarData(dataStr) {
  if (!dataStr) return "—";
  const [year, month, day] = dataStr.split("-");
  return `${day}/${month}/${year}`;
}

function calcularIdade(dataStr) {
  if (!dataStr) return "";
  const [ano, mes] = dataStr.split("-").map(Number);
  const hoje = new Date();
  const totalMeses = (hoje.getFullYear() - ano) * 12 + (hoje.getMonth() + 1 - mes);

  if (totalMeses < 12) return `(${totalMeses} ${totalMeses === 1 ? "mês" : "meses"})`;
  const anos = Math.floor(totalMeses / 12);
  return `(${anos} ${anos === 1 ? "ano" : "anos"})`;
}

function criarCardAnimal(animal, { onEditar, onExcluir }) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = animal.id;

  card.innerHTML = `
    <div class="card__info">
      <h3 class="card__nome">${getEmoji(animal.especie)} ${escapeHtml(animal.nome)}</h3>
      <p class="card__detalhe"><strong>Espécie:</strong> ${escapeHtml(animal.especie)}</p>
      ${animal.raca ? `<p class="card__detalhe"><strong>Raça:</strong> ${escapeHtml(animal.raca)}</p>` : ""}
      ${animal.data_nascimento ? `<p class="card__detalhe"><strong>Nascimento:</strong> ${formatarData(animal.data_nascimento)} ${calcularIdade(animal.data_nascimento)}</p>` : ""}
    </div>
    <div class="card__acoes">
      <button class="btn btn--secondary btn--sm btn-editar" title="Editar animal">✏️ Editar</button>
      <button class="btn btn--danger btn--sm btn-excluir" title="Excluir animal">🗑️ Excluir</button>
    </div>
  `;

  card.querySelector(".btn-editar").addEventListener("click", () => onEditar(animal));
  card.querySelector(".btn-excluir").addEventListener("click", () => onExcluir(animal));

  return card;
}

export function renderizarAnimais(container, animais, callbacks) {
  container.innerHTML = "";

  if (!animais.length) {
    container.appendChild(
      criarEstadoVazio({
        texto: "Nenhum animal cadastrado para este tutor.",
        subtexto: 'Clique em "+ Adicionar Animal" para cadastrar o primeiro.',
      })
    );
    return;
  }

  const fragment = document.createDocumentFragment();
  animais.forEach((animal) => {
    fragment.appendChild(criarCardAnimal(animal, callbacks));
  });
  container.appendChild(fragment);
}
