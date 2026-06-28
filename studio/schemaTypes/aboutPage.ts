import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
    defineField({
      name: 'groupPhoto',
      title: 'Group photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'whoWeAreHeading', title: '"Who We Are" heading', type: 'string' }),
    defineField({
      name: 'whoWeAre',
      title: '"Who We Are" text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'features',
      title: 'Highlight cards',
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
                  { title: 'Users', value: 'users' },
                  { title: 'Map pin', value: 'mappin' },
                  { title: 'Target', value: 'target' },
                  { title: 'Activity', value: 'activity' },
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
    defineField({ name: 'missionHeading', title: 'Mission heading', type: 'string' }),
    defineField({ name: 'missionStatement', title: 'Mission statement', type: 'text', rows: 3 }),
    defineField({
      name: 'missionPoints',
      title: 'Mission points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About page' }
    },
  },
})
