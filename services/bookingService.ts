import type { Physician, Slot, Booking } from "@prisma/client";
import type { BookingFormData } from "@/types/bookingFormData";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export async function getPhysicians(): Promise<Physician[]> {
    try {
        const response = await fetch(`${BASE_URL}/api/physicians`)
        if (!response.ok) throw new Error('Failed to fetch physicians');
        const data = await response.json();
        return data.physicians as Physician[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getSlots(physicianId: number): Promise<Slot[]> {
    try {
        const response = await fetch(`${BASE_URL}/api/slots?physicianId=${physicianId}`)
        if (!response.ok) throw new Error('Failed to fetch time slots');
        const data = await response.json();
        return data.slots as Slot[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function createBooking(formData: BookingFormData, slotId: number): Promise<Booking> {
    try {
        const response = await fetch(`${BASE_URL}/api/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, slotId }),
        });
        if (!response.ok) throw new Error('Failed to create booking');
        const data = await response.json();
        return data as Booking;
    } catch (error) {
        console.error(error);
        throw error;
    }
}