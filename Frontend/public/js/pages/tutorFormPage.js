import { tutoresApi } from "../api/tutoresApi.js";
import { validarTutor } from "../validators/tutorValidator.js";
import { mensagens } from "../ui/mensagens.js";
import { exibirErrosCampo } from "../ui/formErros.js";

const params = new URLSearchParams(window.location.search);
const tutorId = params.get("id") ? Number(params.get("id")) : null;
const modoEdicao = tutorId !== null;

const form = document.getElementById("form-tutor");
const tituloPagina = document.getElementById("titulo-pagina");
const btnSubmit = document.getElementById("btn-submit");
const btnVoltar = document.getElementById("btn-voltar");
const btnCancelar = document.getElementById("btn-cancelar");

const PAGINA_LISTA = "index.html";
const ATRASO_REDIRECIONAMENTO_MS = 1200;

const campoNome = document.getElementById("nome");
const campoTelefone = document.getElementById("telefone");
const campoEmail = document.getElementById("email");
const campoEndereco = document.getElementById("endereco");

function configurarModo() {
  if (modoEdicao) {
    tituloPagina.textContent = "Editar Tutor";
    btnSubmit.textContent = "Salvar Alterações";
  } else {
    tituloPagina.textContent = "Novo Tutor";
    btnSubmit.textContent = "Cadastrar Tutor";
  }
}

async function carregarTutor() {
  if (!modoEdicao) return;
  try {
    const tutor = await tutoresApi.buscar(tutorId);
    campoNome.value = tutor.nome ?? "";
    campoTelefone.value = tutor.telefone ?? "";
    campoEmail.value = tutor.email ?? "";
    campoEndereco.value = tutor.endereco ?? "";
  } catch (err) {
    mensagens.erro(`Não foi possível carregar os dados do tutor: ${err.message}`);
  }
}

function coletarDados() {
  return {
    nome: campoNome.value,
    telefone: campoTelefone.value,
    email: campoEmail.value,
    endereco: campoEndereco.value,
  };
}

function voltarParaLista() {
  window.location.href = PAGINA_LISTA;
}

function aplicarMascaraTelefone(input) {
  input.addEventListener("input", () => {
    let v = input.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 7) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    input.value = v;
  });
}

async function submeterFormulario(e) {
  e.preventDefault();
  const dados = coletarDados();
  const { valido, erros } = validarTutor(dados);

  exibirErrosCampo(erros);
  if (!valido) return;

  btnSubmit.disabled = true;
  btnSubmit.textContent = "Salvando...";

  try {
    if (modoEdicao) {
      await tutoresApi.atualizar(tutorId, dados);
      mensagens.sucesso("Tutor atualizado com sucesso!");
    } else {
      await tutoresApi.criar(dados);
      mensagens.sucesso("Tutor cadastrado com sucesso!");
    }
    setTimeout(voltarParaLista, ATRASO_REDIRECIONAMENTO_MS);
  } catch (err) {
    if (err.detalhes) exibirErrosCampo(err.detalhes);
    mensagens.erro(err.message);
    btnSubmit.disabled = false;
    configurarModo();
  }
}

btnVoltar.addEventListener("click", voltarParaLista);
btnCancelar.addEventListener("click", voltarParaLista);

form.addEventListener("submit", submeterFormulario);
aplicarMascaraTelefone(campoTelefone);
configurarModo();
carregarTutor();
