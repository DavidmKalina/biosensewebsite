import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsItem',
  title: 'News item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Internal path (e.g. /project/vr-pain-management) or full URL.',
    }),
    defineField({
      name: 'category',
      title: 'Category label',
      type: 'string',
      description: 'e.g. "Research", "Team".',
    }),
  ],
  orderings: [
    { title: 'Date (newest first)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date' },
  },
})
