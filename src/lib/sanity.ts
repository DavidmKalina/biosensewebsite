import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production'
const previewToken = import.meta.env.VITE_SANITY_PREVIEW_TOKEN as string | undefined

if (!projectId) {
  // Surface a clear message during development if the env var is missing.
  console.warn(
    '[sanity] VITE_SANITY_PROJECT_ID is not set. Add it to your .env file (see .env.example).'
  )
}

export const sanityClient: SanityClient = createClient({
  projectId: projectId || 'missing-project-id',
  dataset,
  apiVersion: '2024-01-01',
  // useCdn = true serves cached, fast responses. Content updates appear within
  // a minute or so, which is fine for a content site.
  useCdn: true,
})

// ---------------------------------------------------------------------------
// Preview mode
//
// The normal client above only ever reads published content. Preview mode
// reads drafts too, using a read-only "Viewer" token. There's no server here
// to keep that token secret, so it's bundled into the site's JS and only
// used once preview mode is switched on. Anyone who inspects the bundle
// could read draft content with it, but not edit anything. See
// SANITY_SETUP.md for how the token is scoped and why this tradeoff is okay
// for this site.
// ---------------------------------------------------------------------------

const PREVIEW_STORAGE_KEY = 'biosis:preview'
const PREVIEW_PARAM = 'preview'

const previewClient: SanityClient | null = previewToken
  ? createClient({
      projectId: projectId || 'missing-project-id',
      dataset,
      apiVersion: '2024-01-01',
      token: previewToken,
      // Drafts aren't served by the CDN, and "drafts" perspective overlays
      // unpublished edits on top of published content.
      useCdn: false,
      perspective: 'drafts',
      // This token is an intentional, read-only viewer token bundled for
      // preview mode (see SANITY_SETUP.md), so suppress the browser-token
      // warning it would otherwise log on every load.
      ignoreBrowserTokenWarning: true,
    })
  : null

/**
 * Call once on app start. Turns preview mode on if `?preview=1` is in the
 * URL, turns it off if `?preview=0` is present, and otherwise leaves
 * whatever was set previously (so it survives client-side navigation).
 */
export function initPreviewMode(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  if (!params.has(PREVIEW_PARAM)) return
  if (params.get(PREVIEW_PARAM) === '0') {
    window.sessionStorage.removeItem(PREVIEW_STORAGE_KEY)
  } else {
    window.sessionStorage.setItem(PREVIEW_STORAGE_KEY, '1')
  }
}

export function isPreviewMode(): boolean {
  if (typeof window === 'undefined') return false
  return window.sessionStorage.getItem(PREVIEW_STORAGE_KEY) === '1'
}

/**
 * Returns the drafts-reading client while preview mode is on (and a token is
 * configured), otherwise the normal published-only client.
 */
export function getActiveClient(): SanityClient {
  if (isPreviewMode() && previewClient) return previewClient
  return sanityClient
}

const builder = imageUrlBuilder(sanityClient)

/**
 * Build a URL for a Sanity image. Usage: urlFor(image).width(800).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
