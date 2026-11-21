import { tutoresApi } from "../api/tutoresApi.js";
import { animaisApi } from "../api/animaisApi.js";
import { validarAnimal } from "../validators/animalValidator.js";
import { mensagens } from "../ui/mensagens.js";
import { renderizarAnimais } from "../ui/renderAnimais.js";
import { alternarLoading } from "../ui/dom.js";
import { exibirErrosCampo, limparErrosCampo } from "../ui/formErros.js";

const params = new URLSearchParams(window.location.search);
const tutorId = Number(params.get("tutorId"));

const nomeTutorEl = document.getElementById("nome-tutor");
const listaAnimaisEl = document.getElementById("lista-animais");
const loadingEl = document.getElementById("loading");
const form = document.getElementById("form-animal");
const tituloForm = document.getElementById("titulo-form-animal");
const btnSubmit = document.getElementById("btn-submit-animal");
const btnCancelarEdicao = document.getElementById("btn-cancelar-edicao");
const btnVoltar = document.getElementById("btn-voltar");
const btnAbrirModal = document.getElementById("btn-abrir-modal");
const modal = document.getElementById("modal-animal");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const modalOverlay = document.getElementById("modal-overlay");

let animalEditandoId = null;

function abrirModal() {
  modal.hidden = false;
  document.body.classList.add("modal-aberto");
  document.getElementById("animal-nome").focus();
}

function fecharModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-aberto");
  resetarFormulario();
}

async function inicializar() {
  if (!tutorId) {
    mensagens.erro("ID do tutor não informado.");
    return;
  }
  await Promise.all([carregarTutor(), carregarAnimais()]);
}

async function carregarTutor() {
  try {
    const tutor = await tutoresApi.buscar(tutorId);
    nomeTutorEl.textContent = tutor.nome;
  } catch (err) {
    nomeTutorEl.textContent = "Tutor desconhecido";
    mensagens.erro(`Erro ao carregar tutor: ${err.message}`);
  }
}

async function carregarAnimais() {
  alternarLoading(loadingEl, listaAnimaisEl, true);
  try {
    const animais = await animaisApi.listarPorTutor(tutorId);
    renderizarAnimais(listaAnimaisEl, animais, {
      onEditar: iniciarEdicao,
      onExcluir: confirmarExclusao,
    });
  } catch (err) {
    mensagens.erro(err.message);
  } finally {
    alternarLoading(loadingEl, listaAnimaisEl, false);
  }
}

function iniciarEdicao(animal) {
  animalEditandoId = animal.id;
  tituloForm.textContent = "Editar Animal";
  btnSubmit.textContent = "Salvar Alterações";

  document.getElementById("animal-nome").value = animal.nome ?? "";
  document.getElementById("animal-especie").value = animal.especie ?? "";
  document.getElementById("animal-raca").value = animal.raca ?? "";
  document.getElementById("animal-data_nascimento").value = animal.data_nascimento ?? "";

  abrirModal();
}

function resetarFormulario() {
  animalEditandoId = null;
  tituloForm.textContent = "Adicionar Animal";
  btnSubmit.textContent = "Adicionar Animal";
  form.reset();
  limparErrosCampo();
}

function coletarDados() {
  const dataNascimento = document.getElementById("animal-data_nascimento").value;
  return {
    nome: document.getElementById("animal-nome").value,
    especie: document.getElementById("animal-especie").value,
    raca: document.getElementById("animal-raca").value,
    dataNascimento: dataNascimento || null,
    data_nascimento: dataNascimento || null,
  };
}

async function enviarFormulario(e) {
  e.preventDefault();
  const dados = coletarDados();
  const { valido, erros } = validarAnimal(dados);

  exibirErrosCampo(erros, "erro-animal-");
  if (!valido) return;

  btnSubmit.disabled = true;

  try {
    if (animalEditandoId) {
      await animaisApi.atualizar(tutorId, animalEditandoId, dados);
      mensagens.sucesso("Animal atualizado com sucesso!");
    } else {
      await animaisApi.criar(tutorId, dados);
      mensagens.sucesso("Animal cadastrado com sucesso!");
    }
    fecharModal();
    await carregarAnimais();
  } catch (err) {
    if (err.detalhes) exibirErrosCampo(err.detalhes, "erro-animal-");
    mensagens.erro(err.message);
  } finally {
    btnSubmit.disabled = false;
  }
}

async function confirmarExclusao(animal) {
  const confirmado = window.confirm(`Deseja excluir o animal "${animal.nome}"?`);
  if (!confirmado) return;

  try {
    await animaisApi.excluir(tutorId, animal.id);
    mensagens.sucesso(`Animal "${animal.nome}" excluído com sucesso.`);
    if (animalEditandoId === animal.id) resetarFormulario();
    await carregarAnimais();
  } catch (err) {
    mensagens.erro(err.message);
  }
}

form.addEventListener("submit", enviarFormulario);
btnCancelarEdicao.addEventListener("click", fecharModal);
btnFecharModal.addEventListener("click", fecharModal);
modalOverlay.addEventListener("click", fecharModal);
btnAbrirModal.addEventListener("click", abrirModal);
btnVoltar.addEventListener("click", () => { window.location.href = "index.html"; });

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) fecharModal();
});

inicializar();
