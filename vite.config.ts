import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const SITE_URL = 'https://biosislab.au'

/** Walk the build output and collect a URL path for every index.html. */
function collectUrls(dir: string, base: string = dir, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      collectUrls(full, base, acc)
    } else if (entry === 'index.html') {
      let rel = relative(base, full).replace(/index\.html$/, '').replace(/\\/g, '/')
      rel = '/' + rel.replace(/\/$/, '')
      acc.push(rel === '/' ? '/' : rel)
    }
  }
  return acc
}

/** Generate sitemap.xml from the pages that were actually pre-rendered. */
function writeSitemap(dir?: string) {
  // Some vite-react-ssg versions call onFinished without the output dir, so
  // fall back to the default build directory.
  const outDir = dir && existsSync(dir) ? dir : resolve(process.cwd(), 'dist')
  if (!existsSync(outDir)) return
  const urls = Array.from(new Set(collectUrls(outDir))).sort()
  const today = new Date().toISOString().slice(0, 10)
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${SITE_URL}${u === '/' ? '/' : u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u === '/' ? '1.0' : '0.7'}</priority>\n  </url>`
    )
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  writeFileSync(join(outDir, 'sitemap.xml'), xml)
  // eslint-disable-next-line no-console
  console.log(`[sitemap] wrote ${urls.length} URLs to sitemap.xml`)
}

// https://vite.dev/config/
// `ssgOptions` is consumed by vite-react-ssg. It is cast through UserConfig so
// the build stays type-clean without depending on the package's type
// augmentation being loaded into this file.
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  ssgOptions: {
    script: 'async',
    dirStyle: 'nested',
    entry: 'src/main.tsx',
    formatting: 'none',
    onFinished: (dir?: string) => writeSitemap(dir),
  },
} as UserConfig)
