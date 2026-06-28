/**
 * One-time migration: pushes the website's existing hard-coded content
 * (from src/data/sampleData.ts) into Sanity, uploading images as assets.
 *
 * Usage (from the studio/ folder):
 *   1. Ensure studio/.env has SANITY_STUDIO_PROJECT_ID and SANITY_WRITE_TOKEN
 *      (create a token with "Editor" rights at https://sanity.io/manage).
 *   2. npm run migrate
 *
 * Safe to read: it only writes to your Sanity dataset, never to your files.
 * Documents use deterministic IDs (e.g. project.vr-pain-management) so re-running
 * updates them in place. Note: re-running re-uploads images, which can leave
 * orphaned assets, so ideally run it once.
 */
import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

import {
  contributors,
  projects,
  categories,
  publications,
  latestNews,
  partners,
} from '../../src/data/sampleData'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const PUBLIC_DIR = path.join(ROOT, 'public')

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId) throw new Error('Missing SANITY_STUDIO_PROJECT_ID in studio/.env')
if (!token) throw new Error('Missing SANITY_WRITE_TOKEN in studio/.env (Editor token)')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const ref = (id: string) => ({ _type: 'reference', _ref: id })

let keyCounter = 0
const nextKey = () => `k${(keyCounter++).toString(36)}`

/**
 * Convert a plain string (with blank lines between paragraphs) into Portable
 * Text blocks so the content is editable as rich text in the Studio.
 */
function toPortableText(plain?: string) {
  if (!plain) return undefined
  return plain
    .split(/\n\s*\n/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => ({
      _type: 'block',
      _key: nextKey(),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: nextKey(), text: para, marks: [] }],
    }))
}

async function uploadImage(relPath?: string) {
  if (!relPath) return undefined
  const filePath = path.join(PUBLIC_DIR, relPath)
  if (!fs.existsSync(filePath)) {
    console.warn(`   ! image not found, skipping: ${relPath}`)
    return undefined
  }
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function run() {
  console.log(`\nMigrating content into Sanity project "${projectId}" (dataset: ${dataset})\n`)

  // 1. Categories
  console.log('Categories...')
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i]
    const image = await uploadImage((c as any).imageUrl)
    await client.createOrReplace({
      _id: `category.${c.id}`,
      _type: 'category',
      title: c.title,
      slug: { _type: 'slug', current: c.id },
      description: c.description,
      order: i,
      ...(image ? { image } : {}),
    })
    console.log(`   - ${c.title}`)
  }

  // 2. Subcategories (nested inside each category in the old model)
  console.log('Subcategories...')
  for (const c of categories) {
    for (let j = 0; j < c.subcategories.length; j++) {
      const s = c.subcategories[j]
      await client.createOrReplace({
        _id: `subcategory.${s.id}`,
        _type: 'subcategory',
        title: s.title,
        slug: { _type: 'slug', current: s.id },
        description: s.description,
        category: ref(`category.${c.id}`),
        order: j,
      })
      console.log(`   - ${s.title}  (${c.title})`)
    }
  }

  // 3. Contributors (team)
  console.log('Team members...')
  for (let i = 0; i < contributors.length; i++) {
    const m = contributors[i]
    const image = await uploadImage(m.imageUrl)
    await client.createOrReplace({
      _id: `contributor.${m.id}`,
      _type: 'contributor',
      name: m.name,
      slug: { _type: 'slug', current: m.id },
      role: m.role,
      bio: toPortableText(m.bio),
      order: i,
      ...(m.contributorApiId ? { contributorApiId: m.contributorApiId } : {}),
      ...(image ? { image } : {}),
    })
    console.log(`   - ${m.name}`)
  }

  // 4. Projects
  console.log('Projects...')
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i]
    const image = await uploadImage(p.imageUrl)
    const bannerImage = await uploadImage((p as any).bannerUrl)
    await client.createOrReplace({
      _id: `project.${p.id}`,
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.id },
      shortDescription: p.shortDescription,
      fullDescription: toPortableText(p.fullDescription),
      subcategory: ref(`subcategory.${p.subcategoryId}`),
      contributors: (p.contributors || []).map((cid: string) => ({
        _key: cid,
        ...ref(`contributor.${cid}`),
      })),
      order: i,
      ...(image ? { image } : {}),
      ...(bannerImage ? { bannerImage } : {}),
    })
    console.log(`   - ${p.title}`)
  }

  // 5. Publications
  console.log('Publications...')
  for (const pub of publications) {
    await client.createOrReplace({
      _id: `publication.${pub.id}`,
      _type: 'publication',
      title: pub.title,
      authors: pub.authors,
      journal: pub.journal,
      year: pub.year,
      url: pub.url,
      ...(pub.doi ? { doi: pub.doi } : {}),
    })
  }
  console.log(`   ${publications.length} publications`)

  // 6. News
  console.log('News...')
  for (const n of latestNews) {
    await client.createOrReplace({
      _id: `news.${n.id}`,
      _type: 'newsItem',
      title: n.title,
      date: n.date,
      summary: n.summary,
      link: n.link,
      category: n.category,
    })
  }
  console.log(`   ${latestNews.length} news items`)

  // 7. Partners
  console.log('Partners...')
  for (let i = 0; i < partners.length; i++) {
    const pt = partners[i]
    await client.createOrReplace({
      _id: `partner.${pt.id}`,
      _type: 'partner',
      name: pt.name,
      websiteUrl: pt.websiteUrl,
      order: i,
    })
  }
  console.log(`   ${partners.length} partners`)

  console.log('\nDone. Open your Studio to review the content.\n')
}

run().catch((err) => {
  console.error('\nMigration failed:', err.message)
  process.exit(1)
})
