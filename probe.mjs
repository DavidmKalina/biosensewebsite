import {createClient} from '@sanity/client'
const client = createClient({projectId:'qtcskwbd',dataset:'production',apiVersion:'2024-01-01',useCdn:false})
const q = `{
  "byType": *[!(_type match "sanity.*")] | order(_type) { _type, _id },
  "assets": *[_type=="sanity.imageAsset"]{ _id, originalFilename }
}`
try {
  const r = await client.fetch(q)
  const counts = {}
  for (const d of r.byType) counts[d._type]=(counts[d._type]||0)+1
  console.log('DOC COUNTS:', JSON.stringify(counts,null,2))
  console.log('IDS:')
  for (const d of r.byType) console.log(' ', d._type, d._id)
  console.log('IMAGE ASSETS:', r.assets.length)
  for (const a of r.assets) console.log('  -', a.originalFilename)
} catch(e){ console.error('ERR', e.message) }
