# BioSIS Lab website

Website for the Biosensing and Intelligent Systems (BioSIS) Lab at the
University of Canberra. Production site: https://biosislab.au

Built as a React single-page app that is pre-rendered to static HTML at build
time, so every route ships real content and per-page metadata for search
engines and social previews while remaining a fast client-side app for visitors.

## Tech stack

- React 19 + TypeScript, built with Vite
- `vite-react-ssg` for build-time static pre-rendering
- Chakra UI for components and theming
- Sanity as the headless CMS (see `SANITY_SETUP.md`)
- Deployed on Cloudflare Pages

## Getting started

Requires Node 22 (see `.node-version`).

```bash
npm install      # install dependencies
npm run dev      # start the dev server
```

## Scripts

```bash
npm run build      # pre-render every route to static HTML in dist/
npm run preview    # serve the built dist/ locally
npm run typecheck  # tsc type checking
npm run lint       # eslint
```

## Project structure

```
src/
  components/   Reusable UI, including Seo.tsx (per-page meta and JSON-LD)
  pages/        Route-level pages
  hooks/        Data hooks (Sanity with sample-data fallback)
  lib/          Sanity client, GROQ queries, SEO helpers
  data/         Bundled sample content used as a fallback
  types/        Shared TypeScript types
studio/         Sanity Studio schema and config
public/         Static assets, icons, robots.txt, sitemap.xml
```

## Content

Content is edited in Sanity Studio (`studio/`). When Sanity is unavailable the
site falls back to the bundled sample content in `src/data`. Set the
`VITE_SANITY_*` environment variables (see `.env.example`) to connect a project.

## Deployment

Cloudflare Pages, using build command `npm run build` and output directory
`dist`. `sitemap.xml` is regenerated from the pre-rendered routes on each build.
See `SEO.md` for the SEO setup and verification steps.
