import Link from "next/link";
import { BookOpen, Presentation } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-15 max-w-6xl items-center gap-4 px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5 font-medium text-text">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-[13px] font-semibold text-accent-contrast">
            KS
          </span>
          <span className="tracking-tight">KS Security Research</span>
        </Link>
        <div className="flex-1" />
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm text-text-2 md:flex">
          <Link href="/#learning-paths" className="transition-colors hover:text-text">Learning map</Link>
          <Link href="/topics" className="transition-colors hover:text-text">All topics</Link>
          <Link href="/presentations" className="transition-colors hover:text-text">Presentations</Link>
          <Link href="/topics/langfuse-for-cybersecurity" className="transition-colors hover:text-text">Langfuse + SOC</Link>
        </nav>
        <nav aria-label="Mobile navigation" className="flex items-center gap-1 md:hidden">
          <Link href="/topics" aria-label="All learning topics" className="grid h-9 w-9 place-items-center rounded-lg text-text-2 hover:bg-surface-2 hover:text-text"><BookOpen size={16} /></Link>
          <Link href="/presentations" aria-label="Interactive presentations" className="grid h-9 w-9 place-items-center rounded-lg text-text-2 hover:bg-surface-2 hover:text-text"><Presentation size={16} /></Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
