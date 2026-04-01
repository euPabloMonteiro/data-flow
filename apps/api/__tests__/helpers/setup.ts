import { beforeAll, afterAll } from "vitest";
import { connectDb, disconnectDb, getPrisma } from "@dataflow/database";
import {
  connectRedis,
  disconnectRedis,
  initializeRedisConnection,
} from "@dataflow/queue";
import { initializeDatabase } from "@dataflow/database";

beforeAll(async () => {
  // Inicializa conexões para os testes
  initializeDatabase({
    databaseUrl: process.env.DATABASE_URL!,
    nodeEnv: "test",
  });
  initializeRedisConnection({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
  });
  await connectDb();
  await connectRedis();
});

afterAll(async () => {
  await disconnectDb();
  await disconnectRedis();
});
