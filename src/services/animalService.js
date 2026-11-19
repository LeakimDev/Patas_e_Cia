const animalRepository = require("../repositories/animalRepository");
const tutorService = require("./tutorService");
const AppError = require("../errors/appError");
const {
  textoPreenchido,
  dataNascimentoValida,
} = require("../validators/validators");

function validarDados(dados = {}) {
  const erros = {};
  const { nome, especie, raca, dataNascimento, observacoes } = dados;

  if (!textoPreenchido(nome)) erros.nome = "O nome é obrigatório.";
  if (!textoPreenchido(especie)) erros.especie = "A espécie é obrigatória.";

  const nascimento =
    typeof dataNascimento === "string" ? dataNascimento.trim() : dataNascimento;
  if (
    nascimento != null &&
    nascimento !== "" &&
    !dataNascimentoValida(nascimento)
  ) {
    erros.dataNascimento =
      "Informe uma data de nascimento válida no formato AAAA-MM-DD.";
  }

  if (Object.keys(erros).length > 0) throw AppError.validacao(erros);

  return {
    nome: nome.trim(),
    especie: especie.trim(),
    raca: textoPreenchido(raca) ? raca.trim() : null,
    dataNascimento: nascimento || null,
    observacoes: textoPreenchido(observacoes) ? observacoes.trim() : null,
  };
}

function listar(tutorId) {
  tutorService.buscarPorId(tutorId);
  return animalRepository.listarPorTutor(tutorId);
}

function buscarPorId(tutorId, id) {
  const animal = animalRepository.buscarPorId(id);
  if (!animal || animal.tutor_id !== tutorId) {
    throw AppError.naoEncontrado("Animal");
  }
  return animal;
}

function criar(tutorId, dados) {
  tutorService.buscarPorId(tutorId);
  return animalRepository.criar(tutorId, validarDados(dados));
}

function atualizar(tutorId, id, dados) {
  buscarPorId(tutorId, id);
  return animalRepository.atualizar(id, validarDados(dados));
}

function excluir(tutorId, id) {
  buscarPorId(tutorId, id);
  animalRepository.excluir(id);
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
