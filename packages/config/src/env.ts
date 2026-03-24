import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

const envSchema = z.object({
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),

  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  LOG_LEVEL: z.string().default("info"),

  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.format();
    console.error("❌ Invalid environment variables:");
    console.error(JSON.stringify(errors, null, 2));
    throw new Error("Failed to validate environment variables");
  }

  return result.data;
}

export const env = validateEnv();
