import { Box, Text, Link } from '@chakra-ui/react'
import { isPreviewMode } from '../lib/sanity'

/**
 * Shown across the site whenever preview mode is on, so it's obvious you're
 * looking at unpublished drafts rather than the live site. Click "Exit
 * preview" to go back to published content.
 */
export default function PreviewBanner() {
  if (!isPreviewMode()) return null

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={2000}
      bg="yellow.400"
      color="black"
      textAlign="center"
      py={1}
      fontSize="sm"
    >
      <Text>
        Preview mode: showing unpublished drafts.{' '}
        <Link href="?preview=0" textDecoration="underline" fontWeight="bold">
          Exit preview
        </Link>
      </Text>
    </Box>
  )
}
