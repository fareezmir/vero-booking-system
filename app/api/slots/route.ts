import { prisma } from "@/lib/prisma";
import type { Slot } from "@prisma/client";

// Returns all time slots filtered by the physician, and nobody has booked it yet
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const physicianId = Number(searchParams.get("physicianId"));

  const slots: Slot[] = await prisma.slot.findMany({
    where: {
      physicianId,
      booking: null,
    },
  });

  return Response.json({ slots });
}
