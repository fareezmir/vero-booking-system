import { prisma } from "@/lib/prisma";
import type { Physician } from "@prisma/client";

// Returns all physicians
export async function GET() {
    const physicians: Physician[] = await prisma.physician.findMany();
    return Response.json({ physicians });
}