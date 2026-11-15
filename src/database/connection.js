const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");
const config = require("../config/config");

fs.mkdirSync(path.dirname(config.caminhoBanco), { recursive: true });

const db = new DatabaseSync(config.caminhoBanco);

db.exec("PRAGMA foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS tutores (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    nome      TEXT NOT NULL,
    telefone  TEXT NOT NULL,
    email     TEXT,
    endereco  TEXT
  );
 
  CREATE TABLE IF NOT EXISTS animais (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    tutor_id         INTEGER NOT NULL,
    nome             TEXT NOT NULL,
    especie          TEXT NOT NULL,
    raca             TEXT,
    data_nascimento  TEXT,
    observacoes      TEXT,
    FOREIGN KEY (tutor_id) REFERENCES tutores(id) ON DELETE RESTRICT
  );
 
  CREATE INDEX IF NOT EXISTS idx_animais_tutor ON animais(tutor_id);
`);

module.exports = db;
