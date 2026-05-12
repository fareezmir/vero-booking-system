import type { Physician } from "@prisma/client";

interface PhysicianCardProps {
  physician: Physician;
  selected: boolean;
  onSelect: (id: number) => void;
}

export default function PhysicianCard({ physician, selected, onSelect }: PhysicianCardProps) {
  return (
    <div
      onClick={() => onSelect(physician.id)}
      className={`bg-white rounded-xl p-4 cursor-pointer border transition-all
        ${selected ? 'border-teal bg-sky/20' : 'border-sky hover:border-teal'}`}
    >
      <div className="w-10 h-10 rounded-full bg-sky flex items-center justify-center text-navy font-semibold text-sm mb-3">
        {physician.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
      </div>
      <p className="font-medium text-navy text-sm">{physician.name}</p>
      <p className="text-teal text-xs mt-1">{physician.specialty}</p>
    </div>
  );
}