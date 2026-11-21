# Patas & Cia

Sistema web da Clínica Veterinária Patas & Cia, desenvolvido para a disciplina **N695 - Desenvolvimento de Plataformas Web** (Universidade de Fortaleza).

Permite cadastrar **tutores** e os **animais** de cada tutor (um tutor pode ter vários animais; cada animal pertence a um tutor).

## Funcionalidades

- Listar, cadastrar, editar e excluir tutores
- Listar, cadastrar, editar e excluir os animais de um tutor
- Validação de campos obrigatórios e de telefone no formato `(DD) 9XXXX-XXXX`
- Bloqueio da exclusão de tutor que ainda tenha animais cadastrados

## Estrutura

```
public/
  pages/         telas HTML (lista de tutores, formulário de tutor, animais)
  css/           estilos
  js/
    pages/       orquestração de cada tela
    ui/          renderização e mensagens
    api/         acesso ao serviço Web (fetch)
    validators/  regras de validação de entrada
    mock/        servidor simulado (temporário, até a API real ficar pronta)
server.js        servidor Express
```

## Como rodar

```bash
npm install
npm start
```

Acesse http://localhost:3001

Para desenvolvimento com recarga automática: `npm run dev`.

O servidor do Frontend encaminha automaticamente as requisições `/api` para o Backend na porta 3000.

## Equipe

(preencher com os integrantes)
