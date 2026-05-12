export interface Booking {
  id: number;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reasonForVisit: string;
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

export type BookingStatus = "pending" | "confirmed" | "cancelled";
