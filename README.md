# ATZ Elevators website

The public website for ATZ Elevators, Patna. Built with Next.js (App Router), TypeScript and Tailwind v4, using [cuicui](https://cuicui.day) components. Hosted on Vercel. No database.

## Getting started

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script           | What it does                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run dev`    | Dev server                                                                                               |
| `npm run check`  | Lint, typecheck, unit tests and production build                                                         |
| `npm run test`   | Vitest unit tests                                                                                        |
| `npm run e2e`    | Playwright page, navigation, form and accessibility tests (first run: `npx playwright install chromium`) |
| `npm run format` | Prettier with Tailwind class sorting                                                                     |

## Docs

- Project rules for contributors and agents: [CLAUDE.md](CLAUDE.md)
- Plans, decisions and reviews: [docshub/](docshub/README.md)
