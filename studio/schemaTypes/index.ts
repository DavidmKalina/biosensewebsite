import category from './category'
import subcategory from './subcategory'
import project from './project'
import contributor from './contributor'
import publication from './publication'
import newsItem from './newsItem'
import partner from './partner'

export const schemaTypes = [
  // Projects + how they are organised
  category,
  subcategory,
  project,
  // People
  contributor,
  // Other content
  publication,
  newsItem,
  partner,
]
