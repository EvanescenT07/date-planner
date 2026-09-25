import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="text-5xl mb-4">💌</div>
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--primary)]">
        Page Not Found
      </h2>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        It looks like this romantic path doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors shadow-[0_10px_25px_rgba(231,143,179,0.35)]"
      >
        Return to Date Planner
      </Link>
    </div>
  );
}
