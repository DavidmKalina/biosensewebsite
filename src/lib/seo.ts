// ---------------------------------------------------------------------------
// Central SEO constants and structured-data (JSON-LD) builders.
//
// Everything that needs the site's canonical domain, default copy or
// schema.org markup should import from here so there is a single source of
// truth. Update SITE_URL if the production domain ever changes.
// ---------------------------------------------------------------------------

export const SITE_URL = 'https://biosislab.au'
export const SITE_NAME = 'BioSIS Lab'
export const SITE_TAGLINE = 'Biosensing and Intelligent Systems Research'

// Used when a page does not supply its own title. Kept under ~60 characters of
// distinctive text before the brand so it reads well in search results.
export const DEFAULT_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}, University of Canberra`

export const DEFAULT_DESCRIPTION =
  'BioSIS Lab is a research group at the University of Canberra advancing biosensing and intelligent systems, including objective pain assessment, dementia detection, gait and balance, and VR based pain relief.'

// Shared social-share image (absolute URL is built where it is used).
export const DEFAULT_OG_IMAGE = '/og-image.png'

export const ORG_LOCATION = {
  city: 'Canberra',
  region: 'ACT',
  country: 'AU',
}

/** Turn a root-relative path or absolute URL into an absolute URL. */
export function absoluteUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) return SITE_URL
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

/** schema.org Organization describing the lab. Used on the home page. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'Biosensing and Intelligent Systems Lab',
    url: SITE_URL,
    logo: absoluteUrl('/icon-512.png'),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: DEFAULT_DESCRIPTION,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Canberra',
      url: 'https://www.canberra.edu.au',
    },
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: ORG_LOCATION.city,
        addressRegion: ORG_LOCATION.region,
        addressCountry: ORG_LOCATION.country,
      },
    },
    knowsAbout: [
      'Biosensing',
      'Biomedical signal processing',
      'Machine learning in healthcare',
      'Objective pain assessment',
      'Dementia detection',
      'fNIRS',
      'Gait and balance analysis',
      'Virtual reality pain management',
    ],
  }
}

/** schema.org WebSite. Used on the home page alongside Organization. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { '@type': 'Organization', name: SITE_NAME },
    inLanguage: 'en-AU',
  }
}

/** schema.org Person for a contributor profile page. */
export function personJsonLd(opts: {
  name: string
  role?: string
  description?: string
  image?: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: opts.name,
    jobTitle: opts.role,
    description: opts.description,
    image: opts.image ? absoluteUrl(opts.image) : undefined,
    url: absoluteUrl(opts.path),
    worksFor: {
      '@type': 'Organization',
      name: SITE_NAME,
      parentOrganization: { '@type': 'CollegeOrUniversity', name: 'University of Canberra' },
    },
    affiliation: { '@type': 'CollegeOrUniversity', name: 'University of Canberra' },
  }
}

/** schema.org research project (modelled as a CreativeWork / Project). */
export function projectJsonLd(opts: {
  title: string
  description?: string
  image?: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: opts.title,
    description: opts.description,
    image: opts.image ? absoluteUrl(opts.image) : undefined,
    url: absoluteUrl(opts.path),
    creator: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Canberra',
      url: 'https://www.canberra.edu.au',
    },
  }
}

/** schema.org ScholarlyArticle for a single publication. */
export function scholarlyArticleJsonLd(pub: {
  title: string
  authors: string[]
  journal: string
  year: number
  url?: string
  doi?: string
}) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    name: pub.title,
    author: (pub.authors || []).map((a) => ({ '@type': 'Person', name: a })),
    datePublished: String(pub.year),
    isPartOf: { '@type': 'Periodical', name: pub.journal },
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }
  if (pub.url) data.url = pub.url
  if (pub.doi) {
    data.sameAs = `https://doi.org/${pub.doi}`
    data.identifier = { '@type': 'PropertyValue', propertyID: 'DOI', value: pub.doi }
  }
  return data
}

/** schema.org breadcrumb trail. items are [name, path] pairs. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
