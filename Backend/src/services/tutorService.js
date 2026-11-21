//camada de serviço, regras de negócio, validações, etc.

const tutorRepository = require("../repositories/tutorRepository");
const animalRepository = require("../repositories/animalRepository");
const AppError = require("../errors/appError");
const {
  textoPreenchido,
  telefoneValido,
  formatarTelefone,
  emailValido,
} = require("../validators/validators");

function textoOuNulo(valor) {
  return textoPreenchido(valor) ? valor.trim() : null;
}

function validarDados(dados = {}) {
  const erros = {};

  if (!textoPreenchido(dados.nome)) erros.nome = "O nome é obrigatório.";
  else if (dados.nome.trim().length < 3)
    erros.nome = "O nome deve ter pelo menos 3 caracteres.";

  if (!textoPreenchido(dados.telefone))
    erros.telefone = "O telefone é obrigatório.";
  else if (!telefoneValido(dados.telefone))
    erros.telefone =
      "Telefone inválido. Use o formato (85) 98888-7777 ou (85) 3222-1111.";

  if (textoPreenchido(dados.email) && !emailValido(dados.email.trim()))
    erros.email = "E-mail inválido. Exemplo: nome@dominio.com";

  if (Object.keys(erros).length > 0) throw AppError.validacao(erros);

  return {
    nome: dados.nome.trim(),
    telefone: formatarTelefone(dados.telefone),
    email: textoOuNulo(dados.email),
    endereco: textoOuNulo(dados.endereco),
  };
}

function listar(busca) {
  return tutorRepository.listar(busca ? String(busca).trim() : "");
}

function buscarPorId(id) {
  const tutor = tutorRepository.buscarPorId(id);
  if (!tutor) throw AppError.naoEncontrado("Tutor");
  return tutor;
}

function criar(dados) {
  return tutorRepository.criar(validarDados(dados));
}

function atualizar(id, dados) {
  buscarPorId(id);
  return tutorRepository.atualizar(id, validarDados(dados));
}

function excluir(id) {
  buscarPorId(id);
  const totalAnimais = animalRepository.contarPorTutor(id);
  if (totalAnimais > 0) {
    throw AppError.conflito(
      `Não é possível excluir: este tutor ainda possui ${totalAnimais} animal(is) cadastrado(s). ` +
        "Exclua os animais primeiro.",
    );
  }
  tutorRepository.excluir(id);
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
