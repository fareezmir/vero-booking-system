import type { Slot } from "@prisma/client";

interface SlotCardProps {
  slot: Slot;
  selected: boolean;
  onSelect: (id: number) => void;
}

export default function SlotCard({ slot, selected, onSelect }: SlotCardProps) {
  return (
    <div
      onClick={() => onSelect(slot.id)}
      className={`bg-white rounded-xl p-4 cursor-pointer border text-center transition-all
        ${selected ? "border-teal bg-sky/20" : "border-sky hover:border-teal"}`}
    >
      <p className="text-navy font-medium text-sm">
        {new Date(slot.datetime).toLocaleDateString("en-CA", {
          month: "short",
          day: "numeric",
        })}
      </p>
      <p className="text-teal text-xs mt-1">
        {new Date(slot.datetime).toLocaleTimeString("en-CA", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}
