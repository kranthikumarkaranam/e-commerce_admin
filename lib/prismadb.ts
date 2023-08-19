import { PrismaClient } from '@prisma/client';

// Declare a global variable to hold the PrismaClient instance.
// This ensures a single instance of PrismaClient is used across the application.
declare global {
	var prisma: PrismaClient | undefined;
}

// Create a PrismaClient instance if it doesn't already exist in the global scope.
const prismadb = globalThis.prisma || new PrismaClient();

// If the environment is not in production, assign the PrismaClient instance to the global scope.
if (process.env.NODE_ENV !== 'production') {
	globalThis.prisma = prismadb;
}

// Export the PrismaClient instance.
export default prismadb;
