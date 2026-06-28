import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID as string
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

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

  schema: {
    types: schemaTypes,
  },
})
