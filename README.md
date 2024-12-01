# Tasks Express

Uma API RESTful de lista de tarefas construida com TypeScript, Express, Prisma e PostgreSQL.

## Descrição

Este projeto é uma API de lista de tarefas que permite a criação, edição, atualização, exclusão e busca de tarefas.  A autenticação de usuários é feita via JWT utilizando o Passport.js.

## Tecnologias Utilizadas

* Express.js
* TypeScript
* Prisma
* PostgreSQL
* Docker
* Passport.js

## Passos para Instalação

1. Clone o repositório: `git clone <repositório_git>`
2. Navegue até o diretório do projeto: `cd tasks-express`
3. Instale as dependências: `npm install`
4. Crie um arquivo `.env` baseado em `.env.example`, configurando as variáveis de ambiente.

## Como Usar

1. Execute: `npm run dev`
2. A API estará disponível em: `http://localhost:3333`

## Funcionalidades Principais

* **Autenticação:**
    * Criar usuário
    * Fazer login de usuário
* **Gerenciamento de Tarefas:** (Todos os endpoints abaixo requerem um token JWT válido)
    * Criar tarefa
    * Editar tarefa
    * Atualizar tarefa
    * Excluir tarefa
    * Ver todas as tarefas
    * Buscar uma tarefa por ID


## Configurações Necessárias

Crie um arquivo `.env` no diretório raiz do projeto baseado no arquivo `.env.example` fornecido.  Este arquivo deve conter as credenciais do seu banco de dados PostgreSQL e outras configurações necessárias.


## Licença

MIT

## Contato

[Meu LinkedIn](https://www.linkedin.com/in/felipems1/)
