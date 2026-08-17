import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-8 text-sm text-text-3">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span>Curated public learning from hands-on cybersecurity research.</span>
        <Link href="https://github.com/iamkaushiksaha/learning-hub" className="transition-colors hover:text-text">
          Source on GitHub ↗
        </Link>
      </div>
    </footer>
  );
}
