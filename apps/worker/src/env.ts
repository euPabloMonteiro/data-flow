import dotenv from "dotenv";
import path from "path";
import { z } from "zod";
import {
  baseEnvSchema,
  databaseEnvSchema,
  redisEnvSchema,
} from "@dataflow/config/env";

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

const envSchema = z.object({
  ...baseEnvSchema.shape,
  ...databaseEnvSchema.shape,
  ...redisEnvSchema.shape,
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Invalid env (Worker)");
  console.error(result.error.format());
  process.exit(1);
}

export const env = result.data;
