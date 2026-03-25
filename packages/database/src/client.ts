import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

type DatabaseConfig = {
  databaseUrl: string;
  nodeEnv: string;
};

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

let prismaInstance: PrismaClient | null = null;
let databaseConfig: DatabaseConfig | null = null;

export function initializeDatabase(config: DatabaseConfig) {
  databaseConfig = config;
}

function getDatabaseConfig() {
  if (!databaseConfig) {
    throw new Error("Database config was not initialized");
  }

  return databaseConfig;
}

export function getPrisma() {
  const config = getDatabaseConfig();

  if (!prismaInstance) {
    const adapter = new PrismaPg({ connectionString: config.databaseUrl });
    prismaInstance =
      globalForPrisma.prisma ?? new PrismaClient({ adapter, log: ["error"] });
  }

  if (config.nodeEnv !== "production") {
    globalForPrisma.prisma = prismaInstance;
  }

  return prismaInstance;
}
