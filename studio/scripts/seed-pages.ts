/**
 * Safe, additive seeding for the Homepage + About page singletons ONLY.
 *
 * Unlike `npm run migrate` (which overwrites everything), this uses
 * createIfNotExists, so it will NOT touch any document that already exists.
 * It only creates the `homepage` and `aboutPage` documents if they are missing,
 * leaving all of your professor's edits to projects, team, etc. untouched.
 *
 * Usage (from the studio/ folder):
 *   npm run seed-pages
 */
import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const PUBLIC_DIR = path.join(ROOT, 'public')

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId) throw new Error('Missing SANITY_STUDIO_PROJECT_ID in studio/.env')
if (!token) throw new Error('Missing SANITY_WRITE_TOKEN in studio/.env (Editor token)')

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

let keyCounter = 0
const nextKey = () => `k${(keyCounter++).toString(36)}`

function toPortableText(plain: string) {
  return plain
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => ({
      _type: 'block',
      _key: nextKey(),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: nextKey(), text: p, marks: [] }],
    }))
}

async function uploadImage(relPath: string) {
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

async function exists(id: string) {
  const doc = await client.getDocument(id)
  return Boolean(doc)
}

async function run() {
  console.log(`\nSeeding page singletons into "${projectId}" (dataset: ${dataset})\n`)

  // Homepage --------------------------------------------------------------
  if (await exists('homepage')) {
    console.log('Homepage already exists - leaving it untouched.')
  } else {
    const heroBg = await uploadImage('/images/hero-bg.jpg')
    await client.createIfNotExists({
      _id: 'homepage',
      _type: 'homepage',
      hero: {
        heading: 'BioSIS Lab',
        subheading: 'Pioneering Biosensing and Intelligence Systems for a Healthier Tomorrow',
        ctaLabel: 'Discover Our Mission',
        ctaLink: '/about',
        ...(heroBg ? { backgroundImage: heroBg } : {}),
      },
      researchAreasHeading: 'Our Research Areas',
      researchAreasIntro: 'Multidisciplinary approaches to solving complex problems.',
      researchAreas: [
        { _key: nextKey(), icon: 'activity', title: 'Biosensing', description: 'Advanced sensors for real-time physiological monitoring.' },
        { _key: nextKey(), icon: 'brain', title: 'Artificial Intelligence', description: 'Machine learning algorithms for predictive health analytics.' },
        { _key: nextKey(), icon: 'stethoscope', title: 'Healthcare Systems', description: 'Integrated systems for clinical and remote patient care.' },
      ],
      cta: {
        heading: 'Ready to Collaborate?',
        text: 'Join us in our mission to advance biosensing technology and improve global health outcomes.',
        buttonLabel: 'Contact Us',
        buttonLink: '/contact',
      },
    })
    console.log('Homepage created.')
  }

  // About page ------------------------------------------------------------
  if (await exists('aboutPage')) {
    console.log('About page already exists - leaving it untouched.')
  } else {
    const groupPhoto = await uploadImage('/images/group-photo.jpg')
    await client.createIfNotExists({
      _id: 'aboutPage',
      _type: 'aboutPage',
      heading: 'About BioSIS Lab',
      intro:
        'A collaborative research initiative at the University of Canberra, driving innovation in biosensing and intelligent systems.',
      ...(groupPhoto ? { groupPhoto } : {}),
      whoWeAreHeading: 'Who We Are',
      whoWeAre: toPortableText(
        'We are a dynamic group of researchers and academics who established this group to foster deep collaboration on cutting-edge projects.\n\nRecognising that the most significant breakthroughs happen at the intersection of disciplines, we created BioSIS as a platform to share knowledge, resources, and expertise.'
      ),
      features: [
        { _key: nextKey(), icon: 'users', title: 'Multidisciplinary Expertise', description: 'Bringing together diverse expertise to solve complex problems.' },
        { _key: nextKey(), icon: 'mappin', title: 'University of Canberra', description: "Proudly based in Australia's capital, leveraging world-class academic facilities." },
      ],
      missionHeading: 'Our Mission',
      missionStatement:
        'To advance the frontiers of biosensing technology and intelligence systems through research, collaboration, and a commitment to impactful real-world applications.',
      missionPoints: [
        'Developing novel biosensors for healthcare monitoring',
        'Applying AI/ML to interpret complex biological data',
        'Mentoring the next generation of researchers',
      ],
    })
    console.log('About page created.')
  }

  console.log('\nDone. Existing content was left untouched.\n')
}

run().catch((err) => {
  console.error('\nSeeding failed:', err.message)
  process.exit(1)
})
