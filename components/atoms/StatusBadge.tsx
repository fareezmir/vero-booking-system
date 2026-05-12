interface StatusBadgeProps {
  status: string;
}

const styles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-500",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
