# KS Security Research

A public, structured cybersecurity learning atlas. The site turns selected
research into visual explainers, decision frameworks, interactive learning
paths, and implementation-aware deep dives.

The repository is the curated publishing layer. Raw research, private lab
evidence, customer-sensitive material, and unfinished investigation notes do
not belong here.

## Learning paths

1. **Agentic AI & security** — LLM foundations, reusable skills, governed
   agents, LLM observability, evaluation, and SOC integration.
2. **Detection engineering** — Sentinel Detection-as-Code, validation, CI/CD,
   and delivery governance.
3. **Engineering foundations** — Git collaboration, pull requests, conflicts,
   and parallel worktrees.

The registry in `lib/topics.ts` controls the order, learning stage, level,
format, metadata, search, sitemap, and Open Graph images.

## Repository roles

| Repository | Role | Visibility |
|---|---|---|
| `learning-hub` | Curated public website and publishable source notes | Public |
| `cybersecurity-research` | Canonical raw research, experiments, and working evidence | Private |
| `governed-cybersecurity-ai-session` | Standalone interactive presentation artifacts | Public |

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
  topics/<slug>/page.tsx           published topic pages
  og/[slug]/route.tsx              generated social cards
components/
  home/                             learning-map experience
  content/                          prose, diagrams, callouts, navigation
  site/                             shared header, footer, theme
content/
  topics/<slug>/                    editorial source notes and references
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

## Hosting

The repository does not claim a production domain until hosting is configured.
Set `NEXT_PUBLIC_SITE_URL` to the real canonical HTTPS origin in the deployment
environment. The local fallback is intentionally `http://localhost:3000`.
