import { app } from "./app";
import { env, validateEnv } from "@dataflow/config";
import { connectDb } from "@dataflow/database";
import { connectRedis } from "@dataflow/queue";
import { createLogger } from "@dataflow/logger";

const logger = createLogger("api-gateway");

async function bootstrap() {
  try {
    logger.info("Step 1: Validating environment variables...");
    validateEnv();

    logger.info("Step 2: Checking Infrastructure (Postgres & Redis)");

    await Promise.all([
      connectDb().then(() => logger.info("✅ Postgres Connected")),
      connectRedis().then(() => logger.info("✅ Redis Connected")),
    ]);

    const PORT = env.PORT;

    app.listen(PORT, () => {
      logger.info(`🚀 Step 3: API-Gateway running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.fatal({ err: error }, "Aborting startup: Infrastructure not ready");
    process.exit(1);
  }
}

bootstrap();
