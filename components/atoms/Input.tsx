interface InputProps {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    rows?: number;
  }
  
  export default function Input({ label, type = "text", value, onChange, multiline = false, rows = 3 }: InputProps) {
    return (
      <div>
        <label className="text-sm font-medium text-navy mb-1 block">{label}</label>
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="w-full border border-sky rounded-lg px-4 py-2 text-sm text-navy focus:outline-none focus:border-teal resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-sky rounded-lg px-4 py-2 text-sm text-navy focus:outline-none focus:border-teal"
          />
        )}
      </div>
    );
}