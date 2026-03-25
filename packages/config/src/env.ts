import { z } from "zod";

export const baseEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  LOG_LEVEL: z.string().default("info"),
});

export const databaseEnvSchema = z.object({
  DATABASE_URL: z.string(),
});

export const redisEnvSchema = z.object({
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
});

export const serverEnvSchema = z.object({
  PORT: z.coerce.number().default(3333),
});

export const oauthEnvSchema = z.object({
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI_CALLBACK: z.string().url(),
});

export const authEnvSchema = z.object({
  AUTH_REDIRECT_URL: z.string().url(),
});

export const jwtEnvSchema = z.object({
  JWT_PRIVATE_KEY: z.string().transform((val) => val.replace(/\\n/g, "\n")),
  JWT_PUBLIC_KEY: z.string().transform((val) => val.replace(/\\n/g, "\n")),
});
