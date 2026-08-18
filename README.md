# KS Security Research

A public, structured cybersecurity learning atlas. The site turns selected
research into visual explainers, decision frameworks, interactive learning
paths, technical-learning articles, and full-screen presentation experiences.

The repository is the curated publishing layer. Raw research, private lab
evidence, customer-sensitive material, and unfinished investigation notes do
not belong here.

## Learning paths

1. **Agentic AI foundations** — LLMs, instructions, projects, skills, tools,
   MCP, RAG, bounded loops, and orchestration.
2. **Secure agentic systems** — prompt injection, excessive agency, connected
   context, guardrails, technology layers, Langfuse, and SOC integration.
3. **Cybersecurity Orchestrator** — control-plane architecture, specialist
   flows, ArchStudio, artifacts, lineage, and roadmap discipline.
4. **Build and secure an agent** — scoped task design, threat modelling,
   controls, evaluations, and release readiness.
5. **Detection engineering** — Sentinel Detection-as-Code, validation, CI/CD,
   and delivery governance.
6. **Engineering foundations** — Git collaboration, pull requests, conflicts,
   and parallel worktrees.

The registry in `lib/topics.ts` controls the order, learning stage, level,
format, metadata, search, sitemap, and Open Graph images.

## Repository roles

| Repository | Role | Visibility |
|---|---|---|
| `learning-hub` | Curated public website and publishable source notes | Public |
| `cybersecurity-research` | Canonical raw research, experiments, and working evidence | Private |
| `governed-cybersecurity-ai-session` | Historical presentation source during migration; archive after verified redirect | Public, transition |

See [`content/README.md`](content/README.md) for the editorial workflow and
public-safety gate.

## Run locally

```bash
npm install
npm run dev
```

The local site opens at `http://localhost:3000`.

```bash
npm run lint
npm run build
npm start
```

## Structure

```text
app/
  page.tsx                         home learning map
  topics/[slug]/page.tsx           data-driven technical-learning pages
  topics/<slug>/page.tsx           bespoke long-form topic pages
  presentations/page.tsx           presentation library
  og/[slug]/route.tsx              generated social cards
components/
  home/                             learning-map experience
  content/                          prose, diagrams, callouts, navigation
  site/                             shared header, footer, theme
content/
  topics/<slug>/                    editorial source notes and references
  topic-map.md                      presentation-to-learning-page coverage
public/
  presentations/governed-agentic-ai/  consolidated static presentation runtime
lib/
  topics.ts                         typed topic and learning-path registry
  site.ts                           canonical site metadata
```

## Add or update a topic

1. Create or update `content/topics/<slug>/README.md` with audience, promise,
   claims, implementation status, and public-safety review.
2. Record authoritative sources in `content/topics/<slug>/references.md`.
3. Add the topic to `lib/topics.ts` and place it in one learning path.
4. Create `app/topics/<slug>/page.tsx` using the shared visual primitives.
5. Run lint, production build, and responsive browser checks before review.

## Hosting and release

The application is prepared for Railway as a standalone Next.js service. See
[`DEPLOYMENT.md`](DEPLOYMENT.md) for the first deployment, canonical URL,
health, smoke checks, observation, and rollback. The repository does not claim
a production domain until deployment is verified. The local fallback is
intentionally `http://localhost:3000`.
