# SEO setup for BioSIS Lab

This document explains the SEO work done on the site, how to build and deploy
it, and how to verify everything is working. The production domain is
`https://biosislab.au`.

## What was the problem

The site was a client side rendered React app. When a search engine or social
network requested any page it received an almost empty HTML document (`<div
id="root"></div>`) with no title, description or content. Every route also
shared the single title "BioSIS Lab". In practice this meant the site was close
to invisible to search engines and produced blank link previews when shared.

## What changed

### 1. Build time pre-rendering (the big one)

The app now uses [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg)
to render every route to real static HTML at build time. Crawlers and social
networks now receive a fully formed page with the correct title, description,
headings and body text. The page still hydrates into the same interactive React
app for visitors.

Files involved: `src/main.tsx` (SSG entry), `src/App.tsx` (routes are now a
`RouteRecord[]` array with a shared `Layout`), `vite.config.ts` (`ssgOptions`).

Dynamic routes are pre-rendered via `getStaticPaths` in `src/App.tsx`:

- `/project/:id` for every project
- `/projects/:categoryId` for every research category
- `/contributor/:id/:tab` for every team member's bio

These currently use the bundled sample data slugs. Any item that exists only in
Sanity and not in the sample data still works for visitors (it renders client
side via the SPA fallback), it just is not pre-rendered or listed in the
sitemap. See "Extending pre-rendering to live Sanity content" below.

### 2. Per page meta and structured data

`src/components/Seo.tsx` is a small component added to every page. It sets the
title, meta description, canonical URL, Open Graph and Twitter card tags, and
embeds [schema.org](https://schema.org) JSON-LD. The builders live in
`src/lib/seo.ts`:

- Home: `Organization` and `WebSite`
- Team member pages: `Person`
- Project pages: `CreativeWork`
- Most pages: `BreadcrumbList`

Update `src/lib/seo.ts` if the domain, default description or share image ever
change. It is the single source of truth.

### 3. Base document

`index.html` now ships sensible default meta, Open Graph and Twitter tags, an
`Organization` JSON-LD block, `lang="en-AU"`, a theme colour and a canonical
link. This covers the SPA fallback page and any crawler that does not run the
per page tags.

### 4. Crawl and hosting files (in `public/`)

- `robots.txt` allows all crawlers and points to the sitemap.
- `sitemap.xml` is a baseline list of URLs. The build regenerates it in the
  output from the pages actually pre-rendered (see `writeSitemap` in
  `vite.config.ts`).
- `_redirects` provides the Cloudflare Pages SPA fallback (`/* /index.html
  200`). Pre-rendered files are served first; only unknown paths fall back to
  the app shell.
- `_headers` adds basic security headers and long lived caching for fingerprinted
  assets.

## Build and deploy

Install the new dependencies first (run this on your machine, the lockfile will
update):

```
npm install
```

Then build:

```
npm run build      # vite-react-ssg build -> static HTML per route in dist/
npm run preview    # serve dist/ locally to check it
```

Other scripts:

```
npm run dev        # normal client side dev server (fast, unchanged workflow)
npm run typecheck  # tsc -b
npm run build:csr  # fallback: plain client side build with no pre-rendering
```

### Cloudflare Pages settings

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 22 (already set in `.node-version`)
- Environment variables: add the `VITE_SANITY_*` values from your `.env` so the
  build and the live site can read Sanity.
- Custom domain: `biosislab.au`

## How to verify

After `npm run build`, open the built files and confirm real content is present
before any JavaScript runs:

1. Open `dist/about/index.html` in a text editor. You should see the About
   heading and body text, a `<title>About | BioSIS Lab`, a meta description and
   JSON-LD, not an empty `<div id="root">`.
2. Check `dist/sitemap.xml` lists all the routes.
3. After deploying, fetch `https://biosislab.au/robots.txt` and
   `https://biosislab.au/sitemap.xml` in a browser.
4. Use Google's Rich Results Test and the Facebook Sharing Debugger on a few
   live URLs to confirm the structured data and link previews.

## Already implemented (on-site)

- **Branded social share image** at `public/og-image.png` (1200x630), referenced
  as the default Open Graph / Twitter image via `DEFAULT_OG_IMAGE` in
  `src/lib/seo.ts`.
- **Favicons, app icons and a web manifest** (`public/favicon.ico`,
  `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`,
  `icon-192.png`, `icon-512.png`, `site.webmanifest`), wired into `index.html`.
- **Per-publication structured data**: the Publications page emits a
  `ScholarlyArticle` JSON-LD entry for each paper (see `scholarlyArticleJsonLd`
  in `src/lib/seo.ts`).
- **Live Sanity content in the prerender**: `getStaticPaths` in `src/App.tsx`
  now fetches real project, category and contributor slugs from Sanity at build
  time, falling back to the bundled sample data if the build cannot reach Sanity.
  The generated `dist/sitemap.xml` therefore reflects live content.

## Submitting your sitemap

Your sitemap is generated at build into `dist/sitemap.xml` and served at
`https://biosislab.au/sitemap.xml` once deployed. It does not need to be
submitted manually for Google to find it (it is listed in `robots.txt`), but
submitting it speeds up discovery and lets you monitor indexing.

Google Search Console:

1. Go to https://search.google.com/search-console and add a property for
   `biosislab.au`. Choose the **Domain** property type and verify by adding the
   TXT record it gives you to your domain's DNS (in Cloudflare).
2. Once verified, open **Sitemaps** in the left menu.
3. Enter `sitemap.xml` and click **Submit**.
4. Check back over the following days under **Pages** to confirm URLs are being
   indexed.

Bing Webmaster Tools:

1. Go to https://www.bing.com/webmasters, add `https://biosislab.au`, and verify
   (you can import directly from Search Console).
2. Open **Sitemaps**, submit `https://biosislab.au/sitemap.xml`.

## Remaining recommendations

- Replace the placeholder **GitHub, LinkedIn and Twitter** links in
  `src/components/Footer.tsx` with the lab's real profiles, then add `sameAs`
  entries to the `Organization` JSON-LD in `src/lib/seo.ts` so search engines
  link them to the lab.
- Add the lab's **postal address** and a contact point to the `Organization`
  data for a richer knowledge panel.
- Run the live site through **PageSpeed Insights** and compress large images
  (the hero background and group photo) to improve Core Web Vitals.
- Get **inbound links** from University of Canberra faculty, staff profile and
  partner pages, and link the site from each researcher's ORCID / Google Scholar
  profile.

## Note on verification environment

These changes were written and reviewed against the source, and the supporting
logic (sitemap generation, JSON validity, SSR safety of every component) was
checked. A full production build was not run inside the assistant's sandbox
because the project's dependencies are platform specific and the OneDrive synced
files do not read reliably there. Run `npm install && npm run build` locally
once to confirm, using the verification steps above.
