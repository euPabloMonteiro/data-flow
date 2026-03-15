# 🌊 DataFlow - Data Pipeline & Analytics

O **DataFlow** é um ecossistema de processamento de dados robusto e assíncrono, desenvolvido como um monorepo profissional. Ele permite que usuários façam upload de arquivos CSV complexos, processando-os em segundo plano para gerar insights analíticos em tempo real.

---

## 🎯 O que este projeto resolve?

Sistemas que processam grandes volumes de dados (ETL - Extract, Transform, Load) frequentemente enfrentam gargalos de performance. O DataFlow resolve isso através de:

1. **Delegação de Carga**: A API não processa os dados; ela delega para Workers especializados.
2. **Resiliência**: Se o servidor cair, o processo de leitura do CSV é retomado do ponto onde parou via filas (BullMQ).
3. **Escalabilidade**: Você pode ter um servidor para a API e dez servidores rodando Workers para dar conta de picos de carga.

---

## 📂 Estrutura do Monorepo

O projeto é organizado usando **pnpm workspaces** e **TurboRepo**, permitindo uma separação clara de responsabilidades:

### **Aplicações (`/apps`)**

- **`api`**: Servidor Express que gerencia uploads, autenticação e fornece endpoints de analytics.
- **`worker`**: Processo Node.js dedicado exclusivamente a ler arquivos, validar dados e salvar no banco.
- **`web`**: Frontend em React (Vite) para visualização dos resultados e gestão de uploads.

### **Pacotes (`/packages`)**

- **`queue`**: Onde mora o segredo da comunicação assíncrona (BullMQ + Redis).
- **`database`**: Esquema centralizado do Prisma e instâncias de conexão.
- **`config`**: Gerenciamento de `.env` usando Zod para garantir que o sistema nunca suba sem configurações válidas.
- **`types`**: Contratos de tipos TypeScript compartilhados por todo o repositório.
- **`logger`**: Sistema padronizado de logs para auditoria de processos.

---

## 🚀 Fluxo de Funcionamento

1.  **Usuário** faz o upload de um CSV via Dashboard.
2.  **API** armazena o arquivo e emite um evento (Job) para a fila do Redis.
3.  **Worker** captura o Job, lê o arquivo linha por linha e realiza a extração de dados.
4.  **Banco de Dados** recebe os dados higienizados.
5.  **Dashboard** atualiza automaticamente os gráficos analíticos (Revenue, Top Products, etc).

---

## 🛠️ Tecnologias Utilizadas

- **Runtime**: Node.js & TypeScript
- **Infras**: Redis (Filas), PostgreSQL (Persistência)
- **Engine de Fila**: BullMQ
- **ORM**: Prisma
- **Frontend**: React, Tailwind, Shadcn UI, Recharts

---

Desenvolvido por [euPabloMonteiro](https://github.com/euPabloMonteiro)
