import { prisma } from "@/lib/prisma";
import type { Booking } from "@prisma/client";

// Set booking status
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const { status } = await request.json();
        const { id } = params;

        const booking: Booking = await prisma.booking.update({
            where: { id: Number(id) },
            data: { status }
        })

        return Response.json(booking, { status: 200 }); 
    } catch (error) {
        return Response.json({ error: "Failed to update booking" }, { status: 500 });
    }
}