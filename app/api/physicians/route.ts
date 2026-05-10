import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Returns all physicians
export async function GET() {
    const physicians = await prisma.physician.findMany();
    return Response.json({ physicians });
}