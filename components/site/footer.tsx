import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-text-3 sm:flex-row sm:items-center sm:justify-between">
        <p>Kaushik&apos;s Learning Atlas · Visual research, architectures, and runnable labs.</p>
        <div className="flex items-center gap-5">
          <Link href="/#explore" className="hover:text-text">Explore</Link>
          <Link href="/#series" className="hover:text-text">Series</Link>
        </div>
      </div>
    </footer>
  );
}
