import { connectDb, initializeDatabase } from "@dataflow/database";
import { connectRedis, initializeRedisConnection } from "@dataflow/queue";
import { createLogger } from "@dataflow/logger";
import { generateSpec } from "tsoa";
import { env } from "./env";

const logger = createLogger("api-gateway", {
  nodeEnv: env.NODE_ENV,
  logLevel: env.LOG_LEVEL,
});

async function bootstrap() {
  try {
    logger.info("Step 1: Generating Swagger spec...");
    await generateSpec({
      basePath: "/api",
      entryFile: "src/server.ts",
      noImplicitAdditionalProperties: "throw-on-extras",
      controllerPathGlobs: ["src/modules/**/*.controller.ts"],
      outputDirectory: "dist",
      spec: {
        outputDirectory: "dist",
        specFileBaseName: "swagger",
        securityDefinitions: {
          jwt: {
            type: "apiKey",
            name: "auth_token",
            in: "cookie",
          },
        },
      },
    });
    logger.info("✅ Swagger spec generated");

    logger.info("Step 2: Initializing dependencies...");
    initializeDatabase({
      databaseUrl: env.DATABASE_URL,
      nodeEnv: env.NODE_ENV,
    });
    initializeRedisConnection({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    });

    logger.info("Step 3: Checking Infrastructure (Postgres & Redis)");

    await Promise.all([
      connectDb().then(() => logger.info("✅ Postgres Connected")),
      connectRedis().then(() => logger.info("✅ Redis Connected")),
    ]);

    const { app } = await import("./app");
    const PORT = env.PORT;

    app.listen(PORT, () => {
      logger.info(`🚀 Step 4: API-Gateway running on http://localhost:${PORT}`);
      logger.info(`📚 Swagger UI at http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    logger.fatal({ err: error }, "Aborting startup: Infrastructure not ready");
    process.exit(1);
  }
}

bootstrap();
