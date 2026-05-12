import Button from "@/components/atoms/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-beige">
      <div className="text-center max-w-lg px-6">
        <h1 className="text-3xl font-bold text-navy mb-3 leading-tight">
          Book your appointment,<br />the simple way.
        </h1>
        <p className="text-base text-teal mb-8">
          Choose a physician, pick a time, and you're all set.
        </p>
        <Link href="/book">
          <Button>Book an Appointment</Button>
        </Link>
      </div>

      <div className="absolute bottom-8">
        <Link
          href="/admin"
          className="text-sm text-text-muted hover:text-teal transition-colors"
        >
          Admin access
        </Link>
      </div>
    </main>
  );
}