import { prisma } from "@/lib/prisma";
import type { Physician } from "@prisma/client";

// Returns all physicians
export async function GET() {
    try {
        const physicians: Physician[] = await prisma.physician.findMany();
        return Response.json({ physicians }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to fetch physicians" }, { status: 500 });
    }
}