# Railway deployment and recovery

The learning hub is a public Next.js application with no database or writable
runtime state. Railway builds it as a standalone Node.js service. Interactive
presentations are served as static assets from the same deployment.

## Production authority

- Source repository: `iamkaushiksaha/learning-hub`
- Production branch: `main`
- Build gate: `npm run lint` and `npm run build`
- Readiness endpoint: `/health`
- Deployment configuration: `railway.toml`
- Canonical URL: `NEXT_PUBLIC_SITE_URL`

Do not configure production autodeploy from a feature branch. Pull requests may
use preview environments, but production should track reviewed `main` commits.

## First deployment

1. Merge the reviewed learning-hub pull request into `main`.
2. In Railway, create a project from the public GitHub repository.
3. Select `main` as the production source branch.
4. Railway reads `railway.toml`, runs `npm run build`, and starts the standalone
   server with `npm run start`.
5. Generate a Railway public domain.
6. Set `NEXT_PUBLIC_SITE_URL` to the full HTTPS origin. The runtime can derive a
   fallback from `RAILWAY_PUBLIC_DOMAIN`, but the explicit variable is the
   canonical production authority.
7. Redeploy so metadata, sitemap, robots, structured data, and social images are
   generated with the production origin.

## Release smoke checks

Record the deployed Git commit and verify:

- `/health` returns HTTP 200 and the expected commit.
- `/`, `/topics`, and `/presentations` return HTTP 200.
- One page from every learning path loads without console errors.
- `/topics/langfuse-for-cybersecurity` loads both diagrams and source links.
- `/presentations/governed-agentic-ai/series/` opens the session chooser.
- Every session can restart, navigate, reveal content, and open speaker notes.
- Mobile widths do not create horizontal page overflow.
- `sitemap.xml`, `robots.txt`, and one Open Graph image resolve.

## Observation

For the first production release, observe Railway deployment logs, health
transition, HTTP errors, memory, CPU, response latency, and the presentation
asset routes. Railway's deployment health check proves startup readiness, not
continuous availability; add an external uptime monitor if that becomes a
requirement.

## Rollback

The application has no database migrations. Recovery is one of:

1. Use Railway's rollback/redeploy action to restore the last known-good
   deployment.
2. Revert the faulty merge on `main`, wait for the quality workflow, and deploy
   the revert commit.
3. During presentation migration, temporarily restore the archived GitHub Pages
   presentation URL if the consolidated route is unavailable.

Retain the final standalone presentation repository release and old GitHub
Pages deployment until the Railway routes and shared links have been observed.
