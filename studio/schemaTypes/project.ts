import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the page URL, e.g. /project/vr-pain-management.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'reference',
      to: [{ type: 'subcategory' }],
      description: 'Which subcategory (and therefore category) this project belongs to.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 2,
      description: 'One-line summary shown on cards.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full project write-up. Use the toolbar for headings, bold, and links.',
    }),
    defineField({
      name: 'image',
      title: 'Card image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner image',
      type: 'image',
      options: { hotspot: true },
      description: 'Wide image shown at the top of the project page.',
    }),
    defineField({
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'contributor' }] }],
      description: 'Team members working on this project.',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first. Optional.',
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'subcategory.title', media: 'image' },
  },
})
