import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
});

export function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error(result.error.format());
    process.exit(1);
  }

  return result.data;
}
