import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { Text, Heading, Link, List } from '@chakra-ui/react'

/**
 * Renders either Sanity Portable Text (rich text) or a plain string (the
 * sampleData fallback). Plain strings are split into paragraphs on blank lines.
 */

/**
 * Only allow safe link schemes. Blocks javascript:, data: and similar URIs
 * so a malicious or compromised CMS link can't execute script on click.
 * Returns undefined for anything that isn't an http(s), mailto, tel or
 * relative link, which renders the text without a clickable href.
 */
function safeHref(href?: string): string | undefined {
  if (!href) return undefined
  const trimmed = href.trim()
  if (/^(https?:|mailto:|tel:|\/|#|\.)/i.test(trimmed)) return trimmed
  return undefined
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Text fontSize="lg" lineHeight="1.8" color="fg.muted" mb={4}>
        {children}
      </Text>
    ),
    h2: ({ children }) => (
      <Heading as="h2" size="xl" mt={6} mb={3} color="fg">
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as="h3" size="lg" mt={4} mb={2} color="fg">
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <Text
        as="blockquote"
        borderLeftWidth="4px"
        borderColor="blue.400"
        pl={4}
        my={4}
        fontStyle="italic"
        color="fg.muted"
      >
        {children}
      </Text>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <List.Root mb={4} pl={4} color="fg.muted">
        {children}
      </List.Root>
    ),
    number: ({ children }) => (
      <List.Root as="ol" mb={4} pl={4} color="fg.muted">
        {children}
      </List.Root>
    ),
  },
  listItem: {
    bullet: ({ children }) => <List.Item fontSize="lg">{children}</List.Item>,
    number: ({ children }) => <List.Item fontSize="lg">{children}</List.Item>,
  },
  marks: {
    strong: ({ children }) => (
      <Text as="strong" fontWeight="bold">
        {children}
      </Text>
    ),
    em: ({ children }) => (
      <Text as="em" fontStyle="italic">
        {children}
      </Text>
    ),
    link: ({ children, value }) => (
      <Link
        href={safeHref((value as { href?: string } | undefined)?.href)}
        target="_blank"
        rel="noopener noreferrer"
        color="blue.600"
        textDecoration="underline"
      >
        {children}
      </Link>
    ),
  },
}

interface RichTextProps {
  value?: string | PortableTextBlock[]
}

export const RichText = ({ value }: RichTextProps) => {
  if (!value) return null

  // Plain-string fallback (from sampleData): split on blank lines.
  if (typeof value === 'string') {
    return (
      <>
        {value
          .split(/\n\s*\n/)
          .map((para) => para.trim())
          .filter(Boolean)
          .map((para, i) => (
            <Text key={i} fontSize="lg" lineHeight="1.8" color="fg.muted" mb={4} whiteSpace="pre-line">
              {para}
            </Text>
          ))}
      </>
    )
  }

  return <PortableText value={value} components={components} />
}
