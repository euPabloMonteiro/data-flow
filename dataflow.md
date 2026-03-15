# 📓 Project Journal: DataFlow

Este documento serve como um registro vivo do desenvolvimento, roadmap e progresso do projeto **DataFlow**.

---

## 🎯 Objetivo do Projeto
Construir um sistema de processamento de dados assíncrono de nível profissional, onde o fluxo principal consiste em:
1.  **Ingestão**: Receber upload de arquivos CSV.
2.  **Mensageria**: Enviar o arquivo para uma fila distribuída.
3.  **Processamento**: Executar a lógica de ETL (Extract, Transform, Load) em background.
4.  **Persistência**: Salvar dados higienizados no banco de dados.
5.  **Inteligência**: Gerar analytics e exibir em dashboards dinâmicos.

---

## 🧠 Stack Principal

| Camada | Tecnologias |
| :--- | :--- |
| **Backend** | Node.js, TypeScript, Express, Prisma ORM, PostgreSQL |
| **Infra/Fila** | Redis, BullMQ |
| **Frontend** | React (Vite), Axios, React Query, Tailwind CSS |
| **Design** | Shadcn UI, Recharts |
| **DevOps** | Monorepo, pnpm workspaces, TurboRepo |

---

## 📁 Estrutura de Pastas

### Applications (`/apps`)
- `api` ➜ Portal de entrada (Gateway REST).
- `worker` ➜ O "motor" de processamento de filas.
- `web` ➜ Interface administrativa e dashboards.

### Packages (`/packages`)
- `config` ➜ Variáveis de ambiente com validação Zod.
- `database` ➜ Instancição do Prisma Client.
- `queue` ➜ Definição centralizada de filas e conexões Redis.
- `types` ➜ Interfaces e tipos compartilhados.
- `logger` ➜ Padronização de logs do sistema.

---

## 🏗️ Estado Atual do Projeto

### **Já Implementado** ✅
- [x] Configuração de Monorepo (pnpm + TurboRepo).
- [x] TypeScript Project References configurados.
- [x] Centralização de Variáveis de Ambiente.
- [x] Pacote `@dataflow/queue` com BullMQ unificado.
- [x] Integração API ➜ Fila (Producer).
- [x] Setup inicial do Worker (Consumer).

---

## 🪜 Roadmap e Próximos Passos

### 1️⃣ Finalizar Pipeline de Upload
- Criar endpoint `POST /uploads` usando Multer.
- Implementar salvamento físico em `/uploads`.
- Disparar `fileProcessingQueue.add()` com metadados do arquivo.

### 2️⃣ Implementar Lógica do Worker
- Utilizar `csv-parser` ou `fast-csv` para leitura via stream.
- Validar cada linha com esquemas Zod.
- Persistir dados no Postgres via Prisma.

### 3️⃣ Modelagem de Dados Analíticos
- Tabela `Upload`: Controle de status (Pending, Processing, Completed, Failed).
- Tabela `Sale`: Dados processados para analytics.

### 4️⃣ Dashboard & Visualization
- Criar API de Analytics (`GET /analytics`).
- Renderizar gráficos de:
    - Faturamento por país.
    - Top produtos mais vendidos.
    - Volume de vendas por dia.

---

## 🚀 Visão de Futuro (V2)
- [ ] Processamento de milhões de linhas usando **Streams**.
- [ ] Tracking de progresso em tempo real via WebSockets.
- [ ] Concorrência ajustável para múltiplos Workers simultâneos.

---
> **Manual de bordo do desenvolvedor.** Inspirado em grandes arquiteturas de dados como Stripe e Shopify.
