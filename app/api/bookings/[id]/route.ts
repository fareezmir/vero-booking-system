import { prisma } from "@/lib/prisma";

// Set booking status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { status } = await request.json();
    const { id } = await params;

    const booking = await prisma.booking.update({
      where: { id: Number(id) },
      data: { status },
    });

    return Response.json(booking, { status: 200 });
  } catch {
    return Response.json(
      { error: "Failed to update booking" },
      { status: 500 },
    );
  }
}
