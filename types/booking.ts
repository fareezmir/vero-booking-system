import type { BookingFormData } from "@/types/bookingFormData";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking extends BookingFormData {
  id: number;
  status: string;
  createdAt: string;
  slot: {
    datetime: string;
    physician: {
      name: string;
      specialty: string;
    };
  };
}