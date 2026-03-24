import { validateEnv } from "../packages/config/src/env";
import { execSync, spawn } from "child_process";
import waitOn from "wait-on";

async function bootstrap() {
  console.clear();
  console.log("🛠️  DATAFLOW: PRE-FLIGHT CHECK\n");

  try {
    console.log("1️⃣  Verificando variáveis de ambiente...");
    validateEnv();
    console.log("✅ Variáveis de ambiente válidas!");

    console.log("2️⃣  Verificando Postgres e Redis (Docker)...");
    execSync("docker compose up -d", { stdio: "inherit" });

    await waitOn({
      resources: ["tcp:localhost:5432", "tcp:localhost:6379"],
      timeout: 10000,
      interval: 500,
    });

    console.log("✅ Infraestrutura pronta!");
    console.log("\n3️⃣  Iniciando Aplicações (Web, API, Worker)...\n");

    const turbo = spawn("pnpm", ["turbo", "run", "dev", "--ui=stream"], {
      stdio: "inherit",
      shell: true,
    });

    turbo.on("exit", (code) => process.exit(code ?? 0));
  } catch (error) {
    console.error("\n❌ FALHA NO BOOTSTRAP:");
    console.error("Certifique-se de que o Docker Desktop está rodando.");
    process.exit(1);
  }
}

bootstrap();
