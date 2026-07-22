# Security Research Hub

Kaushik's personal learning & research website — a public site for his blog,
research write-ups, and eventually an about/CV page. Standalone repo, hosted
on Vercel, shareable per-topic (e.g. on LinkedIn).

Built with Next.js. Authored with the help of two custom Claude skills:
`web-experience-design` (design tokens, motion, component patterns) and
`blog-architect` (content, reader psychology). It replaces an earlier
vanilla-static prototype that briefly lived in the private
`cybersecurity-research` repo.

Stack: Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · framer-motion
(`motion`) · next-themes · Geist fonts · lucide-react.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

## Structure

```
app/
  layout.tsx                     # fonts, theme provider, header/footer
  page.tsx                       # home (renders HomeView)
  globals.css                    # design tokens (dark default + light) + Tailwind
  topics/<slug>/page.tsx         # one folder per topic
components/
  site/       header, footer, theme-toggle
  motion/     Reveal, Stagger (framer-motion wrappers)
  content/    Callout, CodeBlock, Tabs, Accordion, Toc, Figure, TopicCard,
              Chip, prose primitives, diagrams
  home/       HomeView (hero, search, category grid)
lib/
  topics.ts   typed topic registry (drives home cards + search)
  motion.ts   shared easing / spring / variants
```

## Add a topic

1. Write the content first (via the `blog-architect` skill; run its
   humanization pass).
2. Add an entry to `lib/topics.ts` (`TOPICS` array) — title, slug, category,
   description, tags, date.
3. Create `app/topics/<slug>/page.tsx` using the content components
   (`H2`, `P`, `Callout`, `Tabs`, `Accordion`, `CodeBlock`, `Figure`,
   diagrams). Copy an existing topic page as the template.
4. Design + motion per the `web-experience-design` skill:
   `workflows/build-topic-page.md` and `workflows/design-review.md`.

## Design tokens

All colors/spacing come from CSS variables in `app/globals.css`, mapped into
Tailwind via `@theme inline`. Dark is the default; light is `[data-theme="light"]`.
To evolve the look, edit the token block (and the skill's `aesthetic-direction.md`)
— never scatter per-page overrides. All token pairs pass WCAG AA.

## Deploy to Vercel

1. Create a GitHub repo and push this (it is a standalone repo — the app is
   at the repo root, not a subfolder).
2. Vercel → New Project → import the repo → framework auto-detected
   (Next.js), Root Directory `/` → Deploy.
3. `main` is production; every branch gets a preview URL. Add a custom
   domain in Vercel project settings when ready.

Note: consider renaming the repo to your preferred public brand name before
creating the GitHub repo — the name is visible in the repo URL and default
Vercel URL.
