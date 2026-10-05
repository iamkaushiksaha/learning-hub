import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, CheckCircle2, Presentation } from "lucide-react";
import { LEARNING_PATHS, topicsByPath } from "@/lib/topics";
import { LEARNING_ARTICLES } from "@/lib/learning-articles";

export const metadata: Metadata = {
  title: "Complete learning catalog",
  description: "Every technical learning page in the KS Security Research atlas, organized by capability path and mapped to the interactive presentation series.",
  alternates: { canonical: "/topics" },
};

export default function TopicsPage() {
  const coveredScenes = LEARNING_ARTICLES.length;
  return (
    <main className="pb-24">
      <section className="relative overflow-hidden border-b border-border px-6 py-16 sm:py-24">
        <div className="learning-grid absolute inset-0 opacity-45" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cat-teal">Complete learning catalog</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-text sm:text-7xl">One curriculum.<span className="block text-accent-2">Every concept connected.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2">The interactive sessions create the story. These technical-learning pages slow down each durable concept with a mental model, visual explanation, decision aid, cybersecurity example, FAQ, and primary sources.</p>
          <div className="mt-8 flex flex-wrap gap-5 border-t border-border pt-6 text-sm text-text-2">
            <span className="flex items-center gap-2"><BookOpen size={16} className="text-accent" /> {LEARNING_PATHS.length} learning paths</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cat-teal" /> {coveredScenes} presentation concept guides</span>
            <Link href="/presentations" className="flex items-center gap-2 font-medium text-text hover:text-accent"><Presentation size={16} /> Open presentations</Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        {LEARNING_PATHS.map((path) => {
          const topics = topicsByPath(path.id);
          return (
            <section key={path.id} className="grid gap-8 border-b border-border py-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
              <div>
                <span className="font-mono text-xs text-accent">PATH {path.index}</span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text">{path.name}</h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-2">{path.promise}</p>
                <p className="mt-5 text-xs text-text-3">{topics.length} topic{topics.length === 1 ? "" : "s"}</p>
              </div>
              <div className="border-t border-border">
                {topics.map((topic, index) => {
                  const article = LEARNING_ARTICLES.find((item) => item.slug === topic.slug);
                  return (
                    <Link key={topic.slug} href={`/topics/${topic.slug}`} className="group grid gap-3 border-b border-border py-5 transition-colors hover:bg-surface-1 sm:grid-cols-[42px_1fr_150px] sm:px-3">
                      <span className="font-mono text-xs text-text-3">{String(index + 1).padStart(2, "0")}</span>
                      <span><span className="font-medium text-text transition-colors group-hover:text-accent-2">{topic.title}</span><span className="mt-1 block text-sm leading-relaxed text-text-3">{topic.description}</span></span>
                      <span className="flex items-start justify-between gap-2 text-xs text-text-3 sm:justify-end"><span>{article ? `${article.session} · ${article.readingTime}` : topic.format}</span><ArrowUpRight size={14} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
