# Paykit landing page

A password-protected Paykit landing page built with Next.js 16 App Router, React, and TypeScript for Vercel. Research, source checks, and the visual/content plan are in [docs/research.md](docs/research.md).

The design uses graphite surfaces, Geist typography, and orange accents. Body copy is at least 16px and labels/secondary links at least 14px. The introductory video appears in the opening section. Original generated illustration assets and their exact prompts are documented in [docs/illustration-prompts.md](docs/illustration-prompts.md). Use the plain **Paykit** name; there is no Paykit logo yet.

The payment explanation is a four-state HTML/SVG animation: starting options,
protocol discovery, finding a shared rail, and direct wallet payment. Its copy and
profiles stay in the server component; the client controller handles playback
only. Visitors can select steps, pause, or replay. Autoplay runs once while the
scene is visible and is disabled for reduced-motion preferences. Previous static
assets and [rollback instructions](docs/illustration-rollback.md) are preserved.

Production URL: [paykit-landing-page.vercel.app](https://paykit-landing-page.vercel.app).

This address is registered as a verified production domain on the existing Vercel project, so production deployments update it automatically.

## Run locally

Use Node.js 22 or newer.

```sh
npm install
cp .env.example .env.local
```

Set both values in `.env.local`:

- `LANDING_PASSWORD`: the agreed preview password.
- `SESSION_SECRET`: an independently generated random secret of at least 32 characters. For example, generate one with `openssl rand -hex 32`.

Do not commit either value. `.env.example` intentionally contains no credentials. The access gate fails closed when its configuration is missing.

```sh
npm run dev
```

Open `http://localhost:3000`. For a production run:

```sh
npm run build
npm start
```

## Checks

```sh
npm test
npm run typecheck
npm run build
npm run test:browser
```

Install a Playwright browser with `npx playwright install chromium` if needed. Build first; browser checks start the production server automatically and read `.env.local`. Use a dedicated local test password and secret. Set `PLAYWRIGHT_BASE_URL` to test an existing deployment and `TEST_LANDING_PASSWORD` if its password differs from the local environment.

## Deploy on Vercel

Import this repository into Vercel using the Next.js framework preset, or deploy from the repository with the Vercel CLI. Configure `LANDING_PASSWORD` and `SESSION_SECRET` as server-side environment variables for every deployed environment that should work, including Preview and Production. Redeploy after changing environment variables.

The current site was deployed with `npx vercel --prod`. Automatic Git deployments are not connected: Vercel's GitHub integration could not link this repository with its current permissions. Use the CLI for subsequent deployments, or enable the repository connection in the Vercel dashboard.

The page checks access on the server before rendering its content. A successful login sets a signed, HTTP-only, same-site cookie for seven days; production cookies are secure. Changing the password or session secret invalidates existing sessions. Keep the preview password out of build commands, source files, screenshots, and committed deployment configuration.

The Vercel project also has a published WAF rule, `Limit preview password attempts`, limiting `/api/access` to ten requests per sixty seconds per IP. This is platform configuration, not source configuration. Preserve it on redeployments and recreate it if moving to a new project.

While the gate is enabled, metadata, `robots.txt`, and response headers discourage indexing. Removing the gate for launch also requires revisiting those indexing settings and the private-preview metadata in `app/layout.tsx`, `app/robots.ts`, and `next.config.ts`.

The teaser loads a `youtube-nocookie.com` embed only after the visitor chooses to watch. The contact form creates an email draft to `info@synonym.to` in the visitor's mail app; the visitor sends it themselves. It does not submit or store leads on this server. Review [Synonym's terms](https://synonym.to/terms-of-service) for the linked contact/privacy information.

The Pubky Marketplace link uses the supplied staging address. It may require separate access; the landing-page password does not unlock that service. Update the URL when a public Marketplace destination is available.

The Lugano workshop includes a Google Calendar link and a protected `.ics` download for Apple Calendar, Outlook, and other calendar apps. The download includes a thirty-minute reminder. Both use 24 October 2026, 14:15–15:00 UTC (16:15–17:00 CEST in Lugano).
