import { Head } from 'vite-react-ssg'
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from '../lib/seo'

interface SeoProps {
  /** Page specific title. The site name is appended automatically. */
  title?: string
  description?: string
  /** Route path beginning with "/" used to build the canonical URL. */
  path?: string
  /** Social share image (root relative path or absolute URL). */
  image?: string
  type?: 'website' | 'article' | 'profile'
  /** One or more schema.org JSON-LD objects to embed. */
  jsonLd?: object | object[]
  noindex?: boolean
}

/**
 * Drop this into any page to control its title, meta description, canonical
 * URL, Open Graph / Twitter cards and structured data. Tags are injected into
 * the document head and are present in the pre-rendered HTML at build time.
 */
export function Seo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  jsonLd,
  noindex,
}: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${SITE_TAGLINE}`
  const desc = description || DEFAULT_DESCRIPTION
  const canonical = absoluteUrl(path)
  const img = absoluteUrl(image || DEFAULT_OG_IMAGE)
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_AU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {/* Structured data (all blocks emitted as a single JSON-LD array) */}
      {blocks.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(blocks.length === 1 ? blocks[0] : blocks)}
        </script>
      )}

      <meta name="theme-color" content="#1976D2" />
      <link rel="sitemap" type="application/xml" href={`${SITE_URL}/sitemap.xml`} />
    </Head>
  )
}

export default Seo
