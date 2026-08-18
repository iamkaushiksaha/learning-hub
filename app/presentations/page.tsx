import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Expand, Keyboard, Layers3, NotebookTabs } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive presentations",
  description: "Full-screen, visual cybersecurity and agentic AI sessions with progressive reveals, speaker notes, sources, and keyboard navigation.",
  alternates: { canonical: "/presentations" },
};

const base = "/presentations/governed-agentic-ai";

export default function PresentationsPage() {
  return (
    <main className="pb-24">
      <section className="relative overflow-hidden border-b border-border px-6 py-16 sm:py-24">
        <div className="learning-grid absolute inset-0 opacity-45" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cat-teal">Presenter mode</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-text sm:text-7xl">Teach visually.<span className="block text-accent-2">Discuss deliberately.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2">The sessions are optimized for live delivery: progressive reveals, decision prompts, animated system maps, speaker notes, references, and full-screen navigation.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pt-12">
        <section className="grid gap-0 overflow-hidden rounded-2xl border border-border lg:grid-cols-[1.05fr_0.95fr]">
          <div className="presentation-poster p-8 sm:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cat-teal">Four-session series</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">From chat.<br /><span className="text-[#9b82ff]">To governed capability.</span></h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#aeb8c8]">Foundations, agentic security, the Cybersecurity Orchestrator, and a hands-on build-and-secure workshop.</p>
            <a href={`${base}/series/`} className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#55b3ff] px-5 py-3 text-sm font-semibold text-[#06111d] transition-transform hover:-translate-y-0.5">Open four-session series <ArrowRight size={16} /></a>
          </div>
          <div className="bg-surface-1 p-8 sm:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-3">Executive summary</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-text">The one-hour narrative</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-text-2">A 28-scene overview connecting LLM foundations, reusable skills, agentic loops, specialist delivery, ArchStudio, security controls, and future-state governance.</p>
            <a href={`${base}/summary/`} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-2">Open executive summary <ArrowRight size={15} /></a>
          </div>
        </section>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          {[[Expand, "Full screen", "Presentation-first canvas"], [Keyboard, "Keyboard control", "Space, arrows, M, N, R, F"], [NotebookTabs, "Speaker notes", "Private delivery guidance"], [Layers3, "Progressive reveals", "One idea at a time"]].map(([Icon, title, copy]) => {
            const IconComponent = Icon as typeof Expand;
            return <div key={String(title)} className="bg-surface-1 p-5"><IconComponent size={18} className="text-accent" /><p className="mt-4 font-medium text-text">{String(title)}</p><p className="mt-1 text-xs leading-relaxed text-text-3">{String(copy)}</p></div>;
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-text-2">Prefer self-paced reading? Every durable concept in the presentation is mapped to a technical-learning article.</p>
          <Link href="/topics" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-2">Browse complete topic catalog <ArrowRight size={15} /></Link>
        </div>
      </div>
    </main>
  );
}
