import { prisma } from "@/lib/prisma";
import type { Booking } from "@prisma/client";

// Creates a new booking
export async function POST(request: Request) {
    const { patientName, patientEmail, patientPhone, reasonForVisit, slotId } = await request.json();

    const booking: Booking = await prisma.booking.create({
        data: { 
            patientName, 
            patientEmail,
            patientPhone,
            reasonForVisit,
            slotId
        },
    });

    return Response.json(booking);
}

// Gets all bookings, as well as the physician name and appointment time (for admin view)
export async function GET() {
    const bookings = await prisma.booking.findMany({
        include: {
            slot: {
                include: {
                    physician: true
                }
            }
        }
    });
    return Response.json({ bookings })
}