import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-navy sticky top-0 z-50">
      <Link href="/" className="text-white font-semibold text-lg tracking-tight">
        Vero Booking
      </Link>
      <Link
        href="/admin"
        className="text-sm text-white/60 hover:text-white transition-colors"
      >
        Admin
      </Link>
    </nav>
  );
}