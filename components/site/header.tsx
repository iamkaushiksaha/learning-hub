import Link from "next/link";
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
          <Link href="/topics/governed-agentic-ai-cybersecurity" className="transition-colors hover:text-text">Agentic AI</Link>
          <Link href="/topics/langfuse-for-cybersecurity" className="transition-colors hover:text-text">Langfuse + SOC</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
