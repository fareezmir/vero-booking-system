import type { Physician } from "@prisma/client";
import PhysicianCard from "@/components/molecules/PhysicianCard";
import Button from "@/components/atoms/Button";

interface PhysicianSelectorProps {
  physicians: Physician[];
  selectedPhysician: number | null;
  onSelect: (id: number) => void;
  onNext: () => void;
}

export default function PhysicianSelector({ physicians, selectedPhysician, onSelect, onNext }: PhysicianSelectorProps) {
  return (
    <div>
      <h2 className="text-lg font-medium text-navy mb-4">Select a Physician</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {physicians.map((physician) => (
          <PhysicianCard
            key={physician.id}
            physician={physician}
            selected={selectedPhysician === physician.id}
            onSelect={onSelect}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => {
          if (!selectedPhysician) return alert("Please select a physician.");
          onNext();
        }} variant="primary">
          Next →
        </Button>
      </div>
    </div>
  );
}