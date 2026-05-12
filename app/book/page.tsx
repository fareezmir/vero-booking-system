"use client";

import { useState, useEffect } from "react";
import type { Physician, Slot } from "@prisma/client";
import { getPhysicians, getSlots, createBooking } from "@/services/bookingService";
import type { BookingFormData } from "@/types/bookingFormData";
import Button from "@/components/atoms/Button";

export default function Book() {

  // Step
  const [step, setStep] = useState(1);

  // Data from API
  const [physicians, setPhysicians] = useState<Physician[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);

  // User selections
  const [selectedPhysician, setSelectedPhysician] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  // Form
  const [formData, setFormData] = useState<BookingFormData>({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    reasonForVisit: "",
  });

  // UI state
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPhysicians().then(setPhysicians);
  }, []);

  useEffect(() => {
    if (selectedPhysician) {
      getSlots(selectedPhysician).then(setSlots);
    }
  }, [selectedPhysician]);

  async function handleSubmit() {
    if (!selectedSlot) return;
    if (!formData.patientName || !formData.patientEmail || !formData.patientPhone || !formData.reasonForVisit) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await createBooking(formData, selectedSlot);
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-beige">
        <div className="text-center max-w-md px-6">
          <h1 className="text-2xl font-bold text-navy mb-3">Booking Requested</h1>
          <p className="text-teal mb-8">We've received your request. You'll hear from us shortly to confirm your appointment.</p>
          <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-beige px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-navy mb-2">Book an Appointment</h1>
        <p className="text-teal mb-8 text-sm">Step {step} of 3</p>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step >= s ? 'bg-navy text-white' : 'bg-sky text-teal'}`}>
                {s}
              </div>
              {s < 3 && <div className={`h-px w-12 ${step > s ? 'bg-navy' : 'bg-sky'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 - Select Physician */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-medium text-navy mb-4">Select a Physician</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {physicians.map((physician) => (
                <div
                  key={physician.id}
                  onClick={() => setSelectedPhysician(physician.id)}
                  className={`bg-white rounded-xl p-4 cursor-pointer border transition-all
                    ${selectedPhysician === physician.id
                      ? 'border-teal bg-sky/20'
                      : 'border-sky hover:border-teal'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-sky flex items-center justify-center text-navy font-semibold text-sm mb-3">
                    {physician.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <p className="font-medium text-navy text-sm">{physician.name}</p>
                  <p className="text-teal text-xs mt-1">{physician.specialty}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={() => {
                if (!selectedPhysician) return alert("Please select a physician.");
                setStep(2);
              }} variant="primary">
                Next →
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 - Select Slot */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-medium text-navy mb-4">Select a Time Slot</h2>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`bg-white rounded-xl p-4 cursor-pointer border text-center transition-all
                    ${selectedSlot === slot.id
                      ? 'border-teal bg-sky/20'
                      : 'border-sky hover:border-teal'}`}
                >
                  <p className="text-navy font-medium text-sm">
                    {new Date(slot.datetime).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-teal text-xs mt-1">
                    {new Date(slot.datetime).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <Button onClick={() => setStep(1)} variant="outline">← Back</Button>
              <Button onClick={() => {
                if (!selectedSlot) return alert("Please select a time slot.");
                setStep(3);
              }} variant="primary">
                Next →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 - Patient Details */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-medium text-navy mb-4">Your Details</h2>
            <div className="bg-white rounded-xl p-6 border border-sky mb-8 flex flex-col gap-4">
              {[
                { label: "Full Name", key: "patientName", type: "text" },
                { label: "Email", key: "patientEmail", type: "email" },
                { label: "Phone", key: "patientPhone", type: "tel" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="text-sm font-medium text-navy mb-1 block">{label}</label>
                  <input
                    type={type}
                    value={formData[key as keyof BookingFormData]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="w-full border border-sky rounded-lg px-4 py-2 text-sm text-navy focus:outline-none focus:border-teal"
                  />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-navy mb-1 block">Reason for Visit</label>
                <textarea
                  value={formData.reasonForVisit}
                  onChange={(e) => setFormData({ ...formData, reasonForVisit: e.target.value })}
                  rows={3}
                  className="w-full border border-sky rounded-lg px-4 py-2 text-sm text-navy focus:outline-none focus:border-teal resize-none"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button onClick={() => setStep(2)} variant="outline">← Back</Button>
              <Button onClick={handleSubmit} variant="primary">
                {loading ? "Submitting..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}