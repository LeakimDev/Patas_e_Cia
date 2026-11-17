//repositorioAnimal - camada de dados para tabela "animais"

const db = require("../database/connection");

function listarPorTutor(tutorId) {
  return db
    .prepare(
      "SELECT * FROM animais WHERE tutor_id = ? ORDER BY nome COLLATE NOCASE",
    )
    .all(tutorId);
}

function buscarPorId(id) {
  return db.prepare("SELECT * FROM animais WHERE id = ?").get(id);
}

function contarPorTutor(tutorId) {
  return db
    .prepare("SELECT COUNT(*) AS total FROM animais WHERE tutor_id = ?")
    .get(tutorId).total;
}

function criar(tutorId, { nome, especie, raca, dataNascimento, observacoes }) {
  const resultado = db
    .prepare(
      `INSERT INTO animais (tutor_id, nome, especie, raca, data_nascimento, observacoes)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(tutorId, nome, especie, raca, dataNascimento, observacoes);
  return buscarPorId(resultado.lastInsertRowid);
}

function atualizar(id, { nome, especie, raca, dataNascimento, observacoes }) {
  db.prepare(
    `UPDATE animais
        SET nome = ?, especie = ?, raca = ?, data_nascimento = ?, observacoes = ?
      WHERE id = ?`,
  ).run(nome, especie, raca, dataNascimento, observacoes, id);
  return buscarPorId(id);
}

function excluir(id) {
  db.prepare("DELETE FROM animais WHERE id = ?").run(id);
}

module.exports = {
  listarPorTutor,
  buscarPorId,
  contarPorTutor,
  criar,
  atualizar,
  excluir,
};
