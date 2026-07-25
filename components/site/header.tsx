import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-5 px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3 text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-md border border-accent/60 bg-accent-soft font-mono text-[11px] font-semibold text-accent">
            KS
            <span className="absolute bottom-0 left-0 h-px w-full bg-accent" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">Learning Atlas</span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-text-3 sm:block">
              by Kaushik Saha
            </span>
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-6 text-sm text-text-2 md:flex" aria-label="Primary">
          <Link href="/#explore" className="transition-colors hover:text-text">
            Explore
          </Link>
          <Link href="/#series" className="transition-colors hover:text-text">
            Series
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
