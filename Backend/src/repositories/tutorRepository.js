//reporitorioTutor - camada de dados, só SQL.

const db = require("../database/connection");

function listar(busca = "") {
  const termo = `%${busca}%`;
  return db
    .prepare(
      `SELECT t.*, COUNT(a.id) AS total_animais
         FROM tutores t
         LEFT JOIN animais a ON a.tutor_id = t.id
        WHERE t.nome LIKE ? OR t.telefone LIKE ?
        GROUP BY t.id
        ORDER BY t.nome COLLATE NOCASE`,
    )
    .all(termo, termo);
}

function buscarPorId(id) {
  return db.prepare("SELECT * FROM tutores WHERE id = ?").get(id);
}

function criar({ nome, telefone, email, endereco }) {
  const resultado = db
    .prepare(
      "INSERT INTO tutores (nome, telefone, email, endereco) VALUES (?, ?, ?, ?)",
    )
    .run(nome, telefone, email, endereco);
  return buscarPorId(resultado.lastInsertRowid);
}

function atualizar(id, { nome, telefone, email, endereco }) {
  db.prepare(
    "UPDATE tutores SET nome = ?, telefone = ?, email = ?, endereco = ? WHERE id = ?",
  ).run(nome, telefone, email, endereco, id);
  return buscarPorId(id);
}

function excluir(id) {
  db.prepare("DELETE FROM tutores WHERE id = ?").run(id);
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
