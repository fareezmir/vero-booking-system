import { prisma } from "@/lib/prisma";
import type { Booking } from "@prisma/client";

// Creates a new booking
export async function POST(request: Request) {
  try {
    const { patientName, patientEmail, patientPhone, reasonForVisit, slotId } =
      await request.json();

    const booking: Booking = await prisma.booking.create({
      data: {
        patientName,
        patientEmail,
        patientPhone,
        reasonForVisit,
        slotId,
      },
    });

    return Response.json(booking, { status: 201 });
  } catch {
    return Response.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}

// Gets all bookings, as well as the physician name and appointment time (for admin view)
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        slot: {
          include: {
            physician: true,
          },
        },
      },
    });
    return Response.json({ bookings }, { status: 200 });
  } catch {
    return Response.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}
