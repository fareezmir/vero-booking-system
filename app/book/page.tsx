"use client";

import { useState, useEffect } from "react";
import type { Physician, Slot } from "@prisma/client";
import { getPhysicians, getSlots, createBooking } from "@/services/bookingService";
import type { BookingFormData } from "@/types/bookingFormData";
import Button from "@/components/atoms/Button";
import StepIndicator from "@/components/molecules/StepIndicator";
import PhysicianSelector from "@/components/organisms/PhysicianSelector";
import SlotSelector from "@/components/organisms/SlotSelector";
import PatientDetailsForm from "@/components/organisms/PatientDetailsForm";

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
  const [error, setError] = useState<string | null>(null);

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
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await createBooking(formData, selectedSlot);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
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

        <StepIndicator currentStep={step} />

        <p className="text-red-500 text-sm mb-4 min-h-[20px]">
          {error ?? ""}
        </p>

        {step === 1 && (
          <PhysicianSelector
            physicians={physicians}
            selectedPhysician={selectedPhysician}
            onSelect={setSelectedPhysician}
            onNext={() => {
              if (!selectedPhysician) { setError("Please select a physician."); return; }
              setError(null);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <SlotSelector
            slots={slots}
            selectedSlot={selectedSlot}
            onSelect={setSelectedSlot}
            onNext={() => {
              if (!selectedSlot) { setError("Please select a time slot."); return; }
              setError(null);
              setStep(3);
            }}
            onBack={() => {
              setSelectedSlot(null);
              setError(null);
              setStep(1);
            }}
          />
        )}

        {step === 3 && (
          <PatientDetailsForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onBack={() => {
              setError(null);
              setStep(2);
            }}
            loading={loading}
          />
        )}
      </div>
    </main>
  );
}