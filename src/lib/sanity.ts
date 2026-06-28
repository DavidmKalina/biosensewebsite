import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production'

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

const builder = imageUrlBuilder(sanityClient)

/**
 * Build a URL for a Sanity image. Usage: urlFor(image).width(800).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
