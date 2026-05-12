import type { BookingFormData } from "@/types/bookingFormData";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

interface PatientDetailsFormProps {
  formData: BookingFormData;
  onChange: (data: BookingFormData) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function PatientDetailsForm({
  formData,
  onChange,
  onSubmit,
  onBack,
  loading,
}: PatientDetailsFormProps) {
  return (
    <div>
      <h2 className="text-lg font-medium text-navy mb-4">Your Details</h2>
      <div className="bg-white rounded-xl p-6 border border-sky mb-8 flex flex-col gap-4">
        <Input
          label="Full Name"
          type="text"
          value={formData.patientName}
          onChange={(v) => onChange({ ...formData, patientName: v })}
        />
        <Input
          label="Email"
          type="email"
          value={formData.patientEmail}
          onChange={(v) => onChange({ ...formData, patientEmail: v })}
        />
        <Input
          label="Phone"
          type="tel"
          value={formData.patientPhone}
          onChange={(v) => onChange({ ...formData, patientPhone: v })}
        />
        <Input
          label="Reason for Visit"
          multiline
          value={formData.reasonForVisit}
          onChange={(v) => onChange({ ...formData, reasonForVisit: v })}
        />
      </div>
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          ← Back
        </Button>
        <Button onClick={onSubmit} variant="primary">
          {loading ? "Submitting..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
}
