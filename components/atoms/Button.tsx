interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
}

const variantStyles = {
  primary: "bg-navy text-white",
  outline: "border border-navy text-navy bg-transparent",
};

export default function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors cursor-pointer ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}