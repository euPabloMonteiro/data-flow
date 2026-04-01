import { getPrisma } from "./client";

export async function connectDb() {
  try {
    const prisma = getPrisma();
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;

    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Failed:", error);
    throw error;
  }
}

export async function disconnectDb() {
  await getPrisma().$disconnect();
}
