# Architecture & Technical Design: DataFlow

Este documento complementa o [dataflow.md](./dataflow.md) e aprofunda-se nos detalhes técnicos, decisões de arquitetura e padrões de implementação adotados no projeto.

---

## 🏗️ Filosofia de Design e Problemas Resolvidos

### 1. Processamento Assíncrono vs. Síncrono

O principal problema resolvido pelo DataFlow é o **bloqueio de recursos do servidor**. Processar um arquivo CSV de milhares ou milhões de linhas dentro de uma requisição HTTP comum causaria:

- **Timeouts**: O cliente desistiria antes do processamento terminar.
- **Memória Estourada**: Carregar arquivos grandes em memória na API derrubaria o processo.
- **Ineficiência**: A API ficaria lenta para outros usuários enquanto processa o arquivo de um.

**A Solução**: O DataFlow utiliza o padrão **Producer/Consumer**.

- A API apenas recebe o arquivo, salva em disco/ storage e cria um "ticket" (Job) no Redis.
- O Worker (Consumidor) detecta o novo Job e processa o arquivo de forma independente e paralela.

---

## 📦 Organização do Monorepo

Utilizamos **pnpm workspaces** com **TurboRepo** para gerenciar múltiplos pacotes e aplicações em um único repositório, garantindo velocidade e reuso de código.

### Estrutura Detalhada

```text
/
├── apps/
│   ├── api (Express)      -> Gateway de entrada, autenticação e gerenciamento de jobs.
│   ├── worker (Node.js)   -> Processador especializado em carga pesada (ETL).
│   └── web (React)        -> Dashboard visível ao usuário final.
│
├── packages/
│   ├── queue              -> Centralização do BullMQ e IORedis (Singleton).
│   ├── database           -> Prisma ORM e Esquema do banco de dados.
│   ├── config             -> Validação de variáveis de ambiente com Zod (Type-safe).
│   ├── types              -> Interfaces TypeScript compartilhadas entre Front e Back.
│   └── logger             -> Sistema de logs padronizado.
```

---

## 🛠️ Tecnologias Chave e Porquês

### BullMQ + Redis

Escolhido pela sua robustez e features avançadas como:

- **Persistência**: Se o Worker cair, o progresso não é perdido.
- **Retentativas (Backoff)**: Se houver erro de banco, o job tenta novamente após X segundos.
- **Prioridade**: Podemos processar arquivos menores antes de arquivos gigantes.

### TypeScript Project References

Configurado para permitir que o compilador (`tsc`) entenda as dependências locais. Isso acelera o build e garante que você não consiga rodar um App se um Pacote do qual ele depende tiver erros de tipagem.

### Prisma (Pacote Compartilhado)

O Prisma reside em `packages/database`. Isso significa que tanto a **API** quanto o **Worker** usam exatamente o mesmo cliente, garantindo que não haja dessincronia no esquema do banco de dados.

---

## 🔄 Lifecycle de um Dado (ETL Flow)

1.  **Ingestão (Extract)**: O usuário envia o CSV via `apps/web`. A `apps/api` recebe via Multer e valida a integridade básica.
2.  **Fila (Transportation)**: A API utiliza `@dataflow/queue` para adicionar um novo job `fileProcessing`.
3.  **Processamento (Transform)**: O `apps/worker` lê o arquivo em stream (para economizar memória), valida os dados com Zod e prepara para inserção.
4.  **Persistência (Load)**: O Worker utiliza `@dataflow/database` para inserir os dados refinados no PostgreSQL.
5.  **Visualização**: A `apps/web` consome a API de analytics para renderizar o Dashboard com Recharts.

---

## 🛡️ Padrões de Qualidade

- **Validação de Env**: O sistema nem inicia se faltar uma variável de ambiente (via `packages/config`).
- **Imports Centralizados**: Apps nunca importam `bullmq` ou `ioredis` diretamente; eles usam as abstrações de `packages/queue`.
- **Clean Code**: Separação clara entre Controllers (entrada) e Services (regras de negócio).

---

## 🚀 Como este projeto escala?

1.  **Horizontalmente**: Podemos rodar 10 instâncias do `apps/worker` em servidores diferentes para processar filas gigantescas simultaneamente.
2.  **Manutenção**: Se precisarmos migrar do PostgreSQL para o MongoDB, alteramos apenas o `packages/database`. O restante do sistema permanece inalterado.
