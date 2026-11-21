//lê a requisição e chama o serviço correspondente, retornando a resposta para o cliente

const tutorService = require("../services/tutorService");
const { lerIdDaRota } = require("./helpers");

function listar(req, res) {
  res.json(tutorService.listar(req.query.busca));
}

function buscarPorId(req, res) {
  res.json(tutorService.buscarPorId(lerIdDaRota(req, "id")));
}

function criar(req, res) {
  res.status(201).json(tutorService.criar(req.body));
}

function atualizar(req, res) {
  res.json(tutorService.atualizar(lerIdDaRota(req, "id"), req.body));
}

function excluir(req, res) {
  tutorService.excluir(lerIdDaRota(req, "id"));
  res.status(204).end();
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
