import category from './category'
import subcategory from './subcategory'
import project from './project'
import contributor from './contributor'
import publication from './publication'
import newsItem from './newsItem'
import partner from './partner'
import homepage from './homepage'
import aboutPage from './aboutPage'

export const schemaTypes = [
  // Site pages (single documents)
  homepage,
  aboutPage,
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
