const animalService = require("../services/animalService");
const { lerIdDaRota } = require("./helpers");

function listar(req, res) {
  const tutorId = lerIdDaRota(req, "tutorId");
  res.json(animalService.listar(tutorId));
}

function buscarPorId(req, res) {
  const tutorId = lerIdDaRota(req, "tutorId");
  const id = lerIdDaRota(req, "id");
  res.json(animalService.buscarPorId(tutorId, id));
}

function criar(req, res) {
  const tutorId = lerIdDaRota(req, "tutorId");
  res.status(201).json(animalService.criar(tutorId, req.body));
}

function atualizar(req, res) {
  const tutorId = lerIdDaRota(req, "tutorId");
  const id = lerIdDaRota(req, "id");
  res.json(animalService.atualizar(tutorId, id, req.body));
}

function excluir(req, res) {
  const tutorId = lerIdDaRota(req, "tutorId");
  const id = lerIdDaRota(req, "id");
  animalService.excluir(tutorId, id);
  res.status(204).end();
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
