# 🐾 Clínica Patas & Cia

Sistema Web da **Clínica Veterinária Patas & Cia** (Cenário 1), desenvolvido para a disciplina
**N695 — Desenvolvimento de Plataformas Web** (Universidade de Fortaleza).

Permite cadastrar **tutores** e os **animais** de cada tutor. Um tutor pode ter vários animais;
cada animal pertence a um único tutor.

- **Aplicação publicada:** _(colar o link aqui)_
- **Repositório:** _[github.com/LeakimDev/Patas_E_Cia](https://github.com/LeakimDev/Patas_e_Cia)_

## Tecnologias

| Camada       | Tecnologia                                          |
| ------------ | --------------------------------------------------- |
| Interface    | HTML, CSS e JavaScript (módulos ES), sem framework  |
| Serviço Web  | Node.js + Express (API REST em JSON)                |
| Persistência | Banco de dados SQLite (módulo nativo `node:sqlite`) |
| Hospedagem   | Render                                              |

## Estrutura do repositório

```
Backend/    API REST, regras de negócio, validações e acesso ao banco
  src/routes · controllers · services · validators · repositories · database
  test/     teste de integração da API
Frontend/   interface (HTML/CSS/JS) e servidor de desenvolvimento
  public/pages · css · js/(api · pages · ui · validators)
render.yaml configuração de publicação
```

O Backend também entrega os arquivos de `Frontend/public`. Por isso a aplicação publicada precisa
de **um único serviço**.

## Como rodar

Requisito: **Node.js 22.13 ou superior** (recomendado o 24 LTS), que traz o módulo `node:sqlite`.
O aviso "ExperimentalWarning: SQLite" no terminal é normal.

**Modo simples (API + interface em um só servidor)**

```sh
cd Backend
npm ci
npm start
```

Abra http://localhost:3000

**Modo desenvolvimento (dois servidores, opcional)**

```sh
# terminal 1
cd Backend && npm ci && npm start
# terminal 2
cd Frontend && npm ci && npm start
```

Abra http://localhost:3001 (o Frontend encaminha `/api` para o Backend na porta 3000).

| Variável    | Padrão                    | Uso                                                         |
| ----------- | ------------------------- | ----------------------------------------------------------- |
| `PORT`      | `3000`                    | Porta HTTP do Backend                                       |
| `DB_PATH`   | `Backend/data/clinica.db` | Arquivo do banco SQLite                                     |
| `SEED_DEMO` | _(vazio)_                 | Com `true`, insere dados fictícios se o banco estiver vazio |

Comandos úteis no `Backend/`: `npm test` (testes), `npm run seed` (dados de exemplo), `npm run dev`.

## API e regras de validação

As rotas, os formatos e os códigos de resposta estão em [`Backend/README.md`](Backend/README.md).
Regras do cenário implementadas (no navegador e no servidor):

- campos obrigatórios (tutor: nome e telefone; animal: nome e espécie);
- telefone em formato válido (celular `(85) 98888-7777` ou fixo `(85) 3222-1111`);
- e-mail válido quando informado e data de nascimento real e não futura;
- **não é possível excluir um tutor que ainda tenha animais** (HTTP 409; o banco também bloqueia com
  chave estrangeira `ON DELETE RESTRICT`).

## Publicação (Render)

1. Repositório público no GitHub.
2. No Render: **New → Blueprint** (usa o `render.yaml`) ou **New → Web Service** com
   Build `npm ci --prefix Backend`, Start `npm start --prefix Backend`, health check `/saude` e
   variáveis `NODE_VERSION=24` e `SEED_DEMO=true`.

> No plano gratuito o disco é temporário: o arquivo do banco é recriado quando o serviço reinicia.
> `SEED_DEMO=true` repõe os dados fictícios. O serviço "dorme" sem acessos, e a primeira visita demora.

## Equipe

| Nome completo                    | Matrícula |
| -------------------------------- | --------- |
| _Mikael Monteiro Gomes_          | _2640566_ |
| _Lucas Soares de Oliveira_       | _2631685_ |
| _Madson Luiz Bastos Maia_        | _2524832_ |
| _Vitor Emanuel de Paiva Pereira_ | _2512882_ |
| _Matias Pereira Vieira_          | _2640885_ |
| _Michele Costa Araújo_           | _2524917_ |

## Uso de IA generativa

_A equipe declara que utilizou IA generativa (Claude, da Anthropic) em duas frentes.
No desenvolvimento: a estrutura inicial do projeto (organização em camadas, serviço Web,
acesso ao banco SQLite, validações, tratamento de erros, teste de integração e a primeira
versão da interface) foi gerada com apoio da ferramenta e depois adaptada pela equipe, que
fizeram algumas reestruturações no projeto com separação entre Frontend e Backend, integração dos serviços, ajustes no CRUD de animais e atualização dos testes e validações. Na documentação: a primeira versão
deste relatório e as orientações de instalação, depuração de erros e publicação. O código foi
executado e testado pela equipe. Os integrantes que participaram Madson Luiz, Lucas Soares e Mikael Monteiro compreendem e
sabem explicar o código entregue._
