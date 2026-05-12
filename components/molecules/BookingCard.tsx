import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";

type BookingStatus = "pending" | "confirmed" | "cancelled";

interface BookingCardProps {
  booking: {
    id: number;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    reasonForVisit: string;
    status: string;
    slot: {
      datetime: string;
      physician: {
        name: string;
        specialty: string;
      };
    };
  };
  onStatusChange: (id: number, status: BookingStatus) => void;
}

export default function BookingCard({
  booking,
  onStatusChange,
}: BookingCardProps) {
  return (
    <div className="bg-white rounded-xl border border-sky p-5">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <p className="font-semibold text-navy">{booking.patientName}</p>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-sm text-teal">
            {booking.slot.physician.name} · {booking.slot.physician.specialty}
          </p>
          <p className="text-sm text-teal mt-0.5">
            {new Date(booking.slot.datetime).toLocaleDateString("en-CA", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
            {" at "}
            {new Date(booking.slot.datetime).toLocaleTimeString("en-CA", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-xs text-text-muted mt-2 italic">
            &ldquo;{booking.reasonForVisit}&rdquo;
          </p>
        </div>

        <div className="flex gap-2">
          {booking.status === "pending" && (
            <>
              <Button
                onClick={() => onStatusChange(booking.id, "confirmed")}
                variant="primary"
              >
                Confirm
              </Button>
              <Button
                onClick={() => onStatusChange(booking.id, "cancelled")}
                variant="outline"
              >
                Cancel
              </Button>
            </>
          )}
          {booking.status === "confirmed" && (
            <Button
              onClick={() => onStatusChange(booking.id, "cancelled")}
              variant="outline"
            >
              Cancel
            </Button>
          )}
          {booking.status === "cancelled" && (
            <span className="text-xs text-text-muted self-center">
              No actions
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-sky flex gap-6 text-xs text-text-muted">
        <span>{booking.patientEmail}</span>
        <span>{booking.patientPhone}</span>
      </div>
    </div>
  );
}
