interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
}

const variantStyles = {
  primary:
    "bg-navy text-white hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 shadow-md hover:shadow-lg",
  outline:
    "border border-navy text-navy bg-transparent hover:scale-105 hover:-translate-y-0.5 active:scale-95",
};

export default function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 cursor-pointer ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}
