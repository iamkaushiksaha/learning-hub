import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpenCheck, Clock3, Lightbulb, Route, ShieldCheck } from "lucide-react";
import type { LearningArticle } from "@/lib/learning-articles";
import { getTopic, topicsByPath } from "@/lib/topics";
import { TopicJsonLd } from "@/components/content/json-ld";
import { Chip } from "@/components/content/chip";
import { Toc } from "@/components/content/toc";
import { Accordion } from "@/components/content/accordion";
import { LearningDiagram } from "@/components/content/learning-diagram";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const toc = [
  { id: "mental-model", label: "Mental model" },
  { id: "visual", label: "Visual explanation" },
  { id: "compare", label: "Compare and decide" },
  { id: "cyber-example", label: "Cybersecurity example" },
  { id: "remember", label: "What to remember" },
  { id: "faq", label: "Questions people ask" },
  { id: "sources", label: "Primary sources" },
];

export function LearningArticlePage({ article }: { article: LearningArticle }) {
  const topic = getTopic(article.slug)!;
  const pathTopics = topicsByPath(article.pathId);
  const position = pathTopics.findIndex((item) => item.slug === article.slug);
  const next = pathTopics[position + 1];

  return (
    <main>
      <TopicJsonLd topic={topic} />
      <section className="learning-article-hero">
        <div className="learning-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pb-20 lg:pt-20">
          <Reveal>
            <div className="text-xs text-text-3">
              <Link href="/" className="hover:text-accent">Learning map</Link>
              {" / "}{article.session}{" / Scenes "}{article.scenes}
            </div>
            <p className="mt-8 font-mono text-xs font-medium tracking-[0.18em] text-cat-teal">{article.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-text sm:text-7xl">
              {article.heroLine}
              <span className="block text-accent-2">{article.heroAccent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2">{article.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map((tag, index) => <Chip key={tag} tone={index === 0 ? "accent" : index === article.tags.length - 1 ? "coral" : "teal"}>{tag}</Chip>)}
            </div>
          </Reveal>
          <Reveal className="learning-hero-guide">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">Learning guide</span>
              <BookOpenCheck size={18} className="text-cat-teal" />
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6 text-sm">
              <div><dt className="text-text-3">Level</dt><dd className="mt-1 font-medium text-text">{article.level}</dd></div>
              <div><dt className="text-text-3">Reading time</dt><dd className="mt-1 flex items-center gap-1.5 font-medium text-text"><Clock3 size={14} /> {article.readingTime}</dd></div>
              <div><dt className="text-text-3">Presentation</dt><dd className="mt-1 font-medium text-text">{article.session}</dd></div>
              <div><dt className="text-text-3">Progress</dt><dd className="mt-1 font-medium text-text">{position + 1} of {pathTopics.length}</dd></div>
            </dl>
            <div className="mt-6 h-1 overflow-hidden rounded-full bg-surface-2"><div className="h-full bg-gradient-to-r from-accent to-cat-teal" style={{ width: `${((position + 1) / pathTopics.length) * 100}%` }} /></div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-24 pt-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <Toc entries={toc} />
        <article className="min-w-0">
          <section id="mental-model" className="scroll-mt-24">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">01 · Mental model</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">{article.model.title}</h2>
            {article.model.body.map((paragraph) => <p key={paragraph} className="mt-4 text-[17px] leading-[1.78] text-text-2">{paragraph}</p>)}
          </section>

          <Reveal as="section" className="mt-12 scroll-mt-24" >
            <span id="visual" className="scroll-mt-24" />
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">02 · Visual explanation</p>
            <LearningDiagram visual={article.visual} />
          </Reveal>

          <section id="compare" className="mt-12 scroll-mt-24">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">03 · Compare and decide</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">{article.comparison.title}</h2>
            <div className="mt-6 overflow-x-auto border-y border-border">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead><tr><th className="w-1/4 py-4 pr-5 font-mono text-[11px] uppercase tracking-wide text-text-3">Decision lens</th><th className="w-[37.5%] px-5 py-4 text-sm font-medium text-text">{article.comparison.left}</th><th className="w-[37.5%] border-l border-border px-5 py-4 text-sm font-medium text-text">{article.comparison.right}</th></tr></thead>
                <tbody>{article.comparison.rows.map(([lens, left, right]) => <tr key={lens} className="border-t border-border"><td className="py-4 pr-5 font-medium text-text">{lens}</td><td className="px-5 py-4 leading-relaxed text-text-2">{left}</td><td className="border-l border-border px-5 py-4 leading-relaxed text-text-2">{right}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <Reveal as="section" className="mt-12 scroll-mt-24" >
            <span id="cyber-example" className="scroll-mt-24" />
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-cat-teal">04 · Cybersecurity example</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">{article.scenario.title}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-text-2">{article.scenario.setup}</p>
            <Stagger className="mt-7 border-t border-border">
              {article.scenario.steps.map((step, index) => <StaggerItem key={step} className="grid grid-cols-[54px_1fr] gap-3 border-b border-border py-5"><span className="font-mono text-xs text-accent">0{index + 1}</span><p className="text-[15px] leading-relaxed text-text-2">{step}</p></StaggerItem>)}
            </Stagger>
            <div className="mt-5 flex gap-3 border-l-2 border-cat-teal bg-cat-teal-bg/40 px-5 py-4"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-cat-teal" /><p className="text-[15px] leading-relaxed text-text-2"><strong className="text-text">Outcome:</strong> {article.scenario.outcome}</p></div>
          </Reveal>

          <section id="remember" className="mt-12 scroll-mt-24">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">05 · What to remember</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">The 60-second recall</h2>
            <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
              {article.takeaways.map((item, index) => <div key={item} className="bg-surface-1 p-6"><span className="font-mono text-xs text-accent">0{index + 1}</span><p className="mt-4 text-[15px] font-medium leading-relaxed text-text">{item}</p></div>)}
            </div>
            <div className="mt-6 flex gap-3 rounded-xl border border-accent/40 bg-accent-soft px-5 py-4"><Lightbulb size={19} className="mt-0.5 shrink-0 text-accent" /><p className="text-sm leading-relaxed text-text-2"><strong className="text-text">Teach-back prompt:</strong> Explain this concept to a teammate using the diagram, then name one failure mode and the control that stops it.</p></div>
          </section>

          <section id="faq" className="mt-12 scroll-mt-24">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">06 · Questions people ask</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">FAQ</h2>
            <Accordion items={article.faqs.map((item, index) => ({ summary: item.question, content: item.answer, defaultOpen: index === 0 }))} />
          </section>

          <section id="sources" className="mt-12 scroll-mt-24">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">07 · Primary sources</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">Continue with authoritative guidance</h2>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {article.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-4 text-sm text-text-2 transition-colors hover:text-accent"><span>{source.label}</span><ArrowUpRight size={15} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>)}
            </div>
          </section>

          <div className="mt-14 border-t border-border pt-8">
            {next ? <Link href={`/topics/${next.slug}`} className="group flex items-center justify-between gap-5 rounded-xl border border-border bg-surface-1 p-6 transition-colors hover:border-accent"><div><p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-3">Continue this learning path</p><p className="mt-2 text-lg font-medium text-text group-hover:text-accent-2">{next.title}</p></div><Route className="shrink-0 text-accent" /></Link> : <Link href="/topics" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-2"><ArrowLeft size={15} /> Explore the complete topic catalog</Link>}
          </div>
        </article>
      </div>
    </main>
  );
}
