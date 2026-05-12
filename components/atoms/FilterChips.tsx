interface FilterChipsProps {
    label: string;
    options: string[];
    selected: string;
    onChange: (value: string) => void;
  }
  
  export default function FilterChips({ label, options, selected, onChange }: FilterChipsProps) {
    return (
      <div>
        <label className="text-xs text-teal font-medium block mb-1">{label}</label>
        <div className="flex gap-2 flex-wrap">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`text-xs px-4 py-2 rounded-full border transition-all cursor-pointer
                ${selected === option ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-sky hover:border-teal'}`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  }