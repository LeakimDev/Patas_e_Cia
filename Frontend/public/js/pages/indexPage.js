import { tutoresApi } from "../api/tutoresApi.js";
import { mensagens } from "../ui/mensagens.js";
import { renderizarTutores } from "../ui/renderTutores.js";
import { alternarLoading } from "../ui/dom.js";

const listaTutoresEl = document.getElementById("lista-tutores");
const loadingEl = document.getElementById("loading");

async function carregarTutores() {
  alternarLoading(loadingEl, listaTutoresEl, true);
  try {
    const tutores = await tutoresApi.listar();
    renderizarTutores(listaTutoresEl, tutores, {
      onEditar: irParaEdicao,
      onExcluir: confirmarExclusao,
      onVerAnimais: irParaAnimais,
    });
  } catch (err) {
    mensagens.erro(err.message);
  } finally {
    alternarLoading(loadingEl, listaTutoresEl, false);
  }
}

function irParaEdicao(tutor) {
  window.location.href = `tutor-form.html?id=${tutor.id}`;
}

function irParaAnimais(tutor) {
  window.location.href = `animais.html?tutorId=${tutor.id}`;
}

async function confirmarExclusao(tutor) {
  const confirmado = window.confirm(`Deseja excluir o tutor "${tutor.nome}"?\n\nEsta ação não pode ser desfeita.`);
  if (!confirmado) return;

  try {
    await tutoresApi.excluir(tutor.id);
    mensagens.sucesso(`Tutor "${tutor.nome}" excluído com sucesso.`);
    await carregarTutores();
  } catch (err) {
    mensagens.erro(err.message);
  }
}

document.getElementById("btn-novo-tutor").addEventListener("click", () => {
  window.location.href = "tutor-form.html";
});

carregarTutores();
