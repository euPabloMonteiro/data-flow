import dotenv from "dotenv";
import path from "path";
import { z } from "zod";
import {
  authEnvSchema,
  baseEnvSchema,
  databaseEnvSchema,
  jwtEnvSchema,
  oauthEnvSchema,
  redisEnvSchema,
  serverEnvSchema,
} from "@dataflow/config/env";

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

const envSchema = z.object({
  ...baseEnvSchema.shape,
  ...databaseEnvSchema.shape,
  ...redisEnvSchema.shape,
  ...serverEnvSchema.shape,
  ...authEnvSchema.shape,
  ...oauthEnvSchema.shape,
  ...jwtEnvSchema.shape,
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Invalid env (API)");
  console.error(result.error.format());
  process.exit(1);
}

export const env = result.data;
