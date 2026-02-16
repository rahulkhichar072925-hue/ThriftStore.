import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Prisma cannot connect to the database.");
}

const createPrismaClient = () =>
  new PrismaClient({
    log: ["error"],
  });

export const prisma =
  process.env.DATABASE_URL
    ? globalForPrisma.prisma || createPrismaClient()
    : null;

export const hasPrismaModel = (modelName) =>
  Boolean(
    prisma &&
      modelName &&
      prisma[modelName] &&
      typeof prisma[modelName].findMany === "function"
  );

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
