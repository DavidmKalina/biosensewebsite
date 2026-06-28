import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero banner',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text', rows: 2 },
        { name: 'ctaLabel', title: 'Button label', type: 'string' },
        {
          name: 'ctaLink',
          title: 'Button link',
          type: 'string',
          description: 'Internal path (e.g. /about) or full URL.',
        },
        {
          name: 'backgroundImage',
          title: 'Background image',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({ name: 'researchAreasHeading', title: 'Research Areas heading', type: 'string' }),
    defineField({
      name: 'researchAreasIntro',
      title: 'Research Areas intro',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'researchAreas',
      title: 'Research Areas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Activity / Pulse', value: 'activity' },
                  { title: 'Brain', value: 'brain' },
                  { title: 'Stethoscope', value: 'stethoscope' },
                  { title: 'Heart', value: 'heart' },
                  { title: 'Microscope', value: 'microscope' },
                  { title: 'Chip / CPU', value: 'cpu' },
                ],
              },
            },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title', subtitle: 'icon' } },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to action',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'text', title: 'Text', type: 'text', rows: 2 },
        { name: 'buttonLabel', title: 'Button label', type: 'string' },
        { name: 'buttonLink', title: 'Button link', type: 'string' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
