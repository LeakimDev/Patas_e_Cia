const assert = require("node:assert/strict");
const { once } = require("node:events");
const { test } = require("node:test");

process.env.DB_PATH = ":memory:";
const app = require("../src/app");

test("CRUD de tutores e animais pela API", async (t) => {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));

  const base = `http://127.0.0.1:${server.address().port}/api/tutores`;
  const tutorLea = { nome: "Léa de Teste", telefone: "(85) 98888-7777" };
  const tutorHugo = { nome: "Hugo de Teste", telefone: "85 3333 4444" };
  const animal = { nome: "Lua", especie: "Gato", dataNascimento: "2020-02-29" };

  async function requisitar(status, rota = "", method = "GET", dados) {
    const resposta = await fetch(base + rota, {
      method,
      headers: dados === undefined ? {} : { "Content-Type": "application/json" },
      body: dados === undefined ? undefined : JSON.stringify(dados),
    });
    assert.equal(resposta.status, status, `${method} ${rota}`);
    return status === 204 ? null : resposta.json();
  }

  const invalido = await requisitar(400, "", "POST", {
    ...tutorLea,
    telefone: "(85) 98888-7777 letras",
  });
  assert.ok(invalido.detalhes.telefone);

  const lea = await requisitar(201, "", "POST", tutorLea);
  const hugo = await requisitar(201, "", "POST", tutorHugo);
  const rotaLea = `/${lea.id}`;
  const animaisLea = `${rotaLea}/animais`;
  const animaisHugo = `/${hugo.id}/animais`;
  assert.equal((await requisitar(200, rotaLea)).nome, tutorLea.nome);
  assert.equal((await requisitar(200, rotaLea, "PUT", {
    ...tutorLea,
    nome: "Léa da Silva",
  })).nome, "Léa da Silva");
  assert.deepEqual(await requisitar(200, animaisLea), []);
  assert.equal((await requisitar(200, "?busca=Silva"))[0].id, lea.id);

  const semNome = await requisitar(400, animaisLea, "POST", {
    ...animal,
    nome: "",
    dataNascimento: "2021-02-29",
  });
  assert.ok(semNome.detalhes.nome);
  assert.ok(semNome.detalhes.dataNascimento);
  await requisitar(404, "/999/animais", "POST", animal);
  await requisitar(400, "/invalido/animais");

  const lua = await requisitar(201, animaisLea, "POST", animal);
  const rotaLua = `${animaisLea}/${lua.id}`;
  const rotaOutroTutor = `${animaisHugo}/${lua.id}`;
  assert.equal(lua.tutor_id, lea.id);
  assert.equal(lua.data_nascimento, animal.dataNascimento);
  assert.deepEqual(await requisitar(200, animaisLea), [lua]);
  assert.equal((await requisitar(200, "?busca=Silva"))[0].total_animais, 1);
  await requisitar(404, rotaOutroTutor);
  await requisitar(404, rotaOutroTutor, "PUT", animal);
  await requisitar(404, rotaOutroTutor, "DELETE");
  await requisitar(409, rotaLea, "DELETE");

  const atualizado = await requisitar(200, rotaLua, "PUT", {
    nome: "Luna",
    especie: "Gato",
  });
  assert.equal(atualizado.nome, "Luna");
  assert.equal(atualizado.data_nascimento, null);
  assert.deepEqual(await requisitar(200, rotaLua), atualizado);
  await requisitar(204, rotaLua, "DELETE");
  await requisitar(404, rotaLua);
  await requisitar(204, rotaLea, "DELETE");
  await requisitar(404, rotaLea);
});
