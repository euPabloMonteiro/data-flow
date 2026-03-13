import { env } from "@dataflow/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
export const prisma = global.prisma ?? new PrismaClient({ adapter });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
