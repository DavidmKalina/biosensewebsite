import { defineConfig, type DocumentActionComponent } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { EyeOpenIcon } from '@sanity/icons'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID as string
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// The live website, used by the "Open preview" button below.
const SITE_URL = 'https://biosislab.au'

// Maps the document being edited to the page that shows it on the website.
// Falls back to a sensible listing page if there's no slug yet (e.g. a
// brand-new person you haven't named).
function previewPath(doc: { _type?: string; slug?: { current?: string } }): string {
  const slug = doc?.slug?.current
  switch (doc?._type) {
    case 'contributor':
      return slug ? `/contributor/${slug}/bio` : '/team'
    case 'project':
      return slug ? `/project/${slug}` : '/projects'
    case 'category':
    case 'subcategory':
      return '/projects'
    case 'aboutPage':
      return '/about'
    case 'publication':
      return '/publications'
    case 'homepage':
    case 'newsItem':
    case 'partner':
    default:
      return '/'
  }
}

// Adds an "Open preview" item to each document's action menu (next to
// Publish). It opens the live site in preview mode (?preview=1) on the page
// for that document, showing your unpublished draft.
const openPreviewAction: DocumentActionComponent = (props) => {
  const doc = (props.draft || props.published) as
    | { _type?: string; slug?: { current?: string } }
    | null
  return {
    label: 'Open preview',
    icon: EyeOpenIcon,
    onHandle: () => {
      const url = `${SITE_URL}${previewPath(doc || {})}?preview=1`
      window.open(url, '_blank', 'noopener,noreferrer')
      props.onComplete()
    },
  }
}

export default defineConfig({
  name: 'default',
  title: 'BioSIS Lab',

  projectId,
  dataset,

  plugins: [
    // Organised left-hand menu, grouped logically for editors.
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage')
              .id('homepage')
              .child(S.document().schemaType('homepage').documentId('homepage')),
            S.listItem()
              .title('About page')
              .id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.divider(),
            S.listItem().title('Projects').child(S.documentTypeList('project').title('Projects')),
            S.listItem().title('Categories').child(S.documentTypeList('category').title('Categories')),
            S.listItem()
              .title('Subcategories')
              .child(S.documentTypeList('subcategory').title('Subcategories')),
            S.divider(),
            S.listItem().title('Team').child(S.documentTypeList('contributor').title('Team')),
            S.listItem()
              .title('Publications')
              .child(S.documentTypeList('publication').title('Publications')),
            S.listItem().title('News').child(S.documentTypeList('newsItem').title('News')),
            S.listItem().title('Partners').child(S.documentTypeList('partner').title('Partners')),
          ]),
    }),
    // Lets editors/developers test GROQ queries from within the Studio.
    visionTool(),
  ],

  // Adds the "Open preview" button to every document's action menu.
  document: {
    actions: (prev) => [...prev, openPreviewAction],
  },

  schema: {
    types: schemaTypes,
  },
})
