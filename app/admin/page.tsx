"use client";

import { useState, useEffect } from "react";
import { getBookings, updateBookingStatus } from "@/services/bookingService";
import Button from "@/components/atoms/Button";

type BookingStatus = "pending" | "confirmed" | "cancelled";

interface Booking {
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

export default function Admin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [physicianFilter, setPhysicianFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings().then((data) => {
      setBookings(data);
      setLoading(false);
    });
  }, []);

  async function handleStatusChange(id: number, status: BookingStatus) {
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch {
      alert("Failed to update booking status.");
    }
  }

  const physicians = ["all", ...Array.from(new Set(bookings.map((b) => b.slot.physician.name)))];

  const filtered = bookings.filter((b) => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesPhysician = physicianFilter === "all" || b.slot.physician.name === physicianFilter;
    return matchesStatus && matchesPhysician;
  });

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-amber-100 text-amber-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-gray-100 text-gray-500",
    };
    return (
      <span className={`text-xs font-medium px-3 py-1 rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-beige px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-navy mb-2">Admin Dashboard</h1>
        <p className="text-teal text-sm mb-8">Manage upcoming patient bookings</p>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div>
            <label className="text-xs text-teal font-medium block mb-1">Status</label>
            <div className="flex gap-2">
              {["all", "pending", "confirmed", "cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`text-xs px-4 py-2 rounded-full border transition-all cursor-pointer
                    ${statusFilter === s ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-sky hover:border-teal'}`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-teal font-medium block mb-1">Physician</label>
            <div className="flex gap-2 flex-wrap">
              {physicians.map((p) => (
                <button
                  key={p}
                  onClick={() => setPhysicianFilter(p)}
                  className={`text-xs px-4 py-2 rounded-full border transition-all cursor-pointer
                    ${physicianFilter === p ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-sky hover:border-teal'}`}
                >
                  {p === "all" ? "All" : p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings */}
        {loading ? (
          <p className="text-teal text-sm">Loading bookings...</p>
        ) : filtered.length === 0 ? (
          <p className="text-teal text-sm">No bookings found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl border border-sky p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-semibold text-navy">{booking.patientName}</p>
                      {statusBadge(booking.status)}
                    </div>
                    <p className="text-sm text-teal">{booking.slot.physician.name} · {booking.slot.physician.specialty}</p>
                    <p className="text-sm text-teal mt-0.5">
                      {new Date(booking.slot.datetime).toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })}
                      {' at '}
                      {new Date(booking.slot.datetime).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-xs text-text-muted mt-2 italic">"{booking.reasonForVisit}"</p>
                  </div>

                  <div className="flex gap-2">
                    {booking.status === "pending" && (
                      <>
                        <Button onClick={() => handleStatusChange(booking.id, "confirmed")} variant="primary">
                          Confirm
                        </Button>
                        <Button onClick={() => handleStatusChange(booking.id, "cancelled")} variant="outline">
                          Cancel
                        </Button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <Button onClick={() => handleStatusChange(booking.id, "cancelled")} variant="outline">
                        Cancel
                      </Button>
                    )}
                    {booking.status === "cancelled" && (
                      <span className="text-xs text-text-muted self-center">No actions</span>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-sky flex gap-6 text-xs text-text-muted">
                  <span>{booking.patientEmail}</span>
                  <span>{booking.patientPhone}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}