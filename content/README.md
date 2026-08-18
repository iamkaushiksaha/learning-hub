# Content operating model

This folder is the editorial source layer for the public learning hub. It
preserves why a topic exists, which claims are supported, what is implemented,
and what was deliberately excluded from publication.

## Source-of-truth boundaries

- **Private research repository:** raw notes, experiments, screenshots, lab
  evidence, working drafts, and sensitive implementation context.
- **This content folder:** public-safe synthesis, learning design, claims,
  source links, and implementation snapshots.
- **Topic page:** the final reader experience—visual, concise, and traceable to
  this source folder.
- **Presentation library:** full-screen static presentation assets live under
  `public/presentations/` in this repository so articles and sessions share one
  canonical domain. The former standalone repository is retained only through
  the migration and archival window.

## Topic lifecycle

`research → fact-check → public-safety review → structure → visual build → browser QA → publish → refresh`

Each topic source folder should contain:

- `README.md` — audience, learning promise, outline, implementation boundary,
  and review notes.
- `references.md` — authoritative sources, access date, and the claim each
  source supports.
- Optional public-safe diagrams or example inputs when they materially improve
  the explanation.

The governed-agentic-AI curriculum uses a data-driven article source in
`lib/learning-articles.ts` plus `content/topic-map.md`. That map proves coverage
between the presentation scenes and durable pages and avoids duplicating the
same current-state claim across dozens of folders.

## Public-safety gate

Before publishing, confirm that content contains no secrets, credentials,
customer identifiers, proprietary configurations, sensitive prompts or
outputs, private repository links, unpublished vulnerabilities, or operational
details that create avoidable risk. Use pseudonymous examples and minimal data.

## Freshness

Software documentation changes quickly. Pages that describe active SDKs or
platform capabilities must show their implementation version separately from
the current product documentation and should be rechecked before significant
delivery or code reuse.
