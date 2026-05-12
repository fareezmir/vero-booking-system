"use client";

import { useState, useEffect } from "react";
import { getBookings, updateBookingStatus } from "@/services/bookingService";
import BookingCard from "@/components/molecules/BookingCard";
import FilterChips from "@/components/atoms/FilterChips";
import type { Booking, BookingStatus } from "@/types/booking";

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
        prev.map((b) => (b.id === id ? { ...b, status } : b)),
      );
    } catch {
      alert("Failed to update booking status.");
    }
  }

  const physicianNames = bookings.map((booking) => booking.slot.physician.name);
  const uniqueNames = [...new Set(physicianNames)];
  const physicians = ["all", ...uniqueNames];

  const filtered = bookings.filter((b) => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesPhysician =
      physicianFilter === "all" || b.slot.physician.name === physicianFilter;
    return matchesStatus && matchesPhysician;
  });

  return (
    <main className="min-h-screen bg-beige px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-navy mb-2">Admin Dashboard</h1>
        <p className="text-teal text-sm mb-8">
          Manage upcoming patient bookings
        </p>

        <div className="flex gap-6 mb-6 flex-wrap">
          <FilterChips
            label="Status"
            options={["all", "pending", "confirmed", "cancelled"]}
            selected={statusFilter}
            onChange={setStatusFilter}
          />
          <FilterChips
            label="Physician"
            options={physicians}
            selected={physicianFilter}
            onChange={setPhysicianFilter}
          />
        </div>

        {loading ? (
          <p className="text-teal text-sm">Loading bookings...</p>
        ) : filtered.length === 0 ? (
          <p className="text-teal text-sm">No bookings found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
