# Clínica Patas & Cia

Projeto da disciplina N695 — Desenvolvimento de Plataformas Web, Grupo 2.
A API gerencia tutores e animais. Cada animal pertence a um tutor, que pode
ter vários animais.

## Executar localmente

Use o Node.js 24 LTS, que inclui o módulo `node:sqlite`.

```sh
npm ci
npm start
```

A API fica em `http://localhost:3000/api` por padrão. Para verificar se o
servidor está disponível, acesse `GET /saude`.

| Variável | Valor padrão | Uso |
| --- | --- | --- |
| `PORT` | `3000` | Porta HTTP do Express |
| `DB_PATH` | `data/clinica.db` | Caminho do arquivo SQLite |

O servidor cria o banco e as tabelas na inicialização. Na hospedagem, aponte
`DB_PATH` para um volume gravável e persistente. Use dados fictícios na
demonstração pública.

## Rotas da API

| Método | Caminho | Operação |
| --- | --- | --- |
| GET | `/api/tutores` | Lista tutores, com busca opcional em `?busca=` |
| POST | `/api/tutores` | Cadastra um tutor |
| GET | `/api/tutores/:id` | Consulta um tutor |
| PUT | `/api/tutores/:id` | Atualiza um tutor |
| DELETE | `/api/tutores/:id` | Exclui um tutor sem animais cadastrados |
| GET | `/api/tutores/:tutorId/animais` | Lista os animais do tutor |
| POST | `/api/tutores/:tutorId/animais` | Cadastra um animal no tutor |
| GET | `/api/tutores/:tutorId/animais/:id` | Consulta um animal do tutor |
| PUT | `/api/tutores/:tutorId/animais/:id` | Atualiza um animal do tutor |
| DELETE | `/api/tutores/:tutorId/animais/:id` | Exclui um animal do tutor |

Envie JSON com `Content-Type: application/json` em `POST` e `PUT`.
`PUT` recebe os campos obrigatórios e substitui os dados editáveis do
registro. Campos opcionais omitidos ficam como `null`.

- **Tutor:** `nome` e `telefone` são obrigatórios. O telefone aceita, por
  exemplo, `(85) 98888-7777`. `email` e `endereco` são opcionais.
- **Animal:** `nome` e `especie` são obrigatórios. `raca`,
  `dataNascimento` (AAAA-MM-DD) e `observacoes` são opcionais. Nas respostas,
  a data vem em `data_nascimento` e o vínculo em `tutor_id`.
- **Respostas:** criações retornam `201`, exclusões retornam `204` e
  validações retornam `400` com `erro` e, quando aplicável, `detalhes` por
  campo. Recursos ausentes ou animais de outro tutor retornam `404`.
  Excluir um tutor que ainda tenha animais retorna `409`.

## Organização do código

- `src/routes` e `src/controllers`: entrada HTTP e respostas.
- `src/services` e `src/validators`: regras de negócio e validações.
- `src/repositories` e `src/database`: consultas e persistência no SQLite.
- `public`: diretório servido pelo Express para os arquivos da interface.

## Testes

```sh
npm test
```

O teste de integração percorre o CRUD das duas entidades usando um banco
SQLite em memória. Ele verifica a validação, o vínculo do animal com o tutor
e a regra que impede excluir tutores com animais.
