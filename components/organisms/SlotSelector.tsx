import type { Slot } from "@prisma/client";
import SlotCard from "@/components/molecules/SlotCard";
import Button from "@/components/atoms/Button";

interface SlotSelectorProps {
  slots: Slot[];
  selectedSlot: number | null;
  onSelect: (id: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SlotSelector({ slots, selectedSlot, onSelect, onNext, onBack }: SlotSelectorProps) {
  return (
    <div>
      <h2 className="text-lg font-medium text-navy mb-4">Select a Time Slot</h2>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {slots.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            selected={selectedSlot === slot.id}
            onSelect={onSelect}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">← Back</Button>
        <Button onClick={onNext} variant="primary">Next →</Button>
      </div>
    </div>
  );
}