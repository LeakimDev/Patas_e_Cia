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
    mensagens.erro(
      `Não foi possível carregar os dados do tutor: ${err.message}`,
    );
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

function formatarTelefoneDigitado(digitos) {
  if (digitos.length > 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
  }
  if (digitos.length > 6) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  if (digitos.length > 2) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length > 0) return `(${digitos}`;
  return "";
}

function aplicarMascaraTelefone(input) {
  input.addEventListener("input", () => {
    const digitos = input.value.replace(/\D/g, "").slice(0, 11);
    input.value = formatarTelefoneDigitado(digitos);
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
