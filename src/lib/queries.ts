import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { PortableTextBlock } from '@portabletext/types'
import { getActiveClient } from './sanity'

// ---------------------------------------------------------------------------
// Raw shapes as returned by GROQ (images are objects; resolved in hooks).
// ---------------------------------------------------------------------------

export interface RawProject {
  id: string
  title: string
  shortDescription: string
  fullDescription?: PortableTextBlock[]
  image?: SanityImageSource
  bannerImage?: SanityImageSource
  categoryId?: string
  subcategoryId?: string
  contributors?: string[]
}

export interface RawSubcategory {
  id: string
  title: string
  description?: string
}

export interface RawCategory {
  id: string
  title: string
  description?: string
  image?: SanityImageSource
  subcategories: RawSubcategory[]
}

export interface RawContributor {
  id: string
  name: string
  role?: string
  bio?: PortableTextBlock[]
  image?: SanityImageSource
  contributorApiId?: string
}

export interface RawPublication {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number
  url: string
  doi?: string
}

export interface RawNewsItem {
  id: string
  date: string
  title: string
  summary: string
  link: string
  category: string
}

export interface RawPartner {
  id: string
  name: string
  websiteUrl: string
  logo?: SanityImageSource
}

export interface RawHomepage {
  hero?: {
    heading?: string
    subheading?: string
    ctaLabel?: string
    ctaLink?: string
    backgroundImage?: SanityImageSource
  }
  researchAreasHeading?: string
  researchAreasIntro?: string
  researchAreas?: { icon?: string; title?: string; description?: string }[]
  cta?: { heading?: string; text?: string; buttonLabel?: string; buttonLink?: string }
}

export interface RawAboutPage {
  heading?: string
  intro?: string
  groupPhoto?: SanityImageSource
  whoWeAreHeading?: string
  whoWeAre?: PortableTextBlock[]
  features?: { icon?: string; title?: string; description?: string }[]
  missionHeading?: string
  missionStatement?: string
  missionPoints?: string[]
}

// ---------------------------------------------------------------------------
// GROQ queries
// ---------------------------------------------------------------------------

const projectsQuery = `*[_type == "project"] | order(order asc, title asc){
  "id": slug.current,
  title,
  shortDescription,
  fullDescription,
  image,
  bannerImage,
  "categoryId": subcategory->category->slug.current,
  "subcategoryId": subcategory->slug.current,
  "contributors": contributors[]->slug.current
}`

const categoriesQuery = `*[_type == "category"] | order(order asc, title asc){
  "id": slug.current,
  title,
  description,
  image,
  "subcategories": *[_type == "subcategory" && category._ref == ^._id] | order(order asc, title asc){
    "id": slug.current,
    title,
    description
  }
}`

const contributorsQuery = `*[_type == "contributor"] | order(order asc, name asc){
  "id": slug.current,
  name,
  role,
  bio,
  image,
  contributorApiId
}`

const publicationsQuery = `*[_type == "publication"] | order(year desc, title asc){
  "id": _id, title, authors, journal, year, url, doi
}`

const newsQuery = `*[_type == "newsItem"] | order(date desc){
  "id": _id, "date": date, title, summary, link, category
}`

const partnersQuery = `*[_type == "partner"] | order(order asc, name asc){
  "id": _id, name, websiteUrl, logo
}`

const homepageQuery = `*[_type == "homepage"][0]{
  hero{ heading, subheading, ctaLabel, ctaLink, backgroundImage },
  researchAreasHeading,
  researchAreasIntro,
  researchAreas[]{ icon, title, description },
  cta{ heading, text, buttonLabel, buttonLink }
}`

const aboutQuery = `*[_type == "aboutPage"][0]{
  heading,
  intro,
  groupPhoto,
  whoWeAreHeading,
  whoWeAre,
  features[]{ icon, title, description },
  missionHeading,
  missionStatement,
  missionPoints
}`

// ---------------------------------------------------------------------------
// Fetchers
// ---------------------------------------------------------------------------

export const fetchProjects = () => getActiveClient().fetch<RawProject[]>(projectsQuery)
export const fetchCategories = () => getActiveClient().fetch<RawCategory[]>(categoriesQuery)
export const fetchContributors = () => getActiveClient().fetch<RawContributor[]>(contributorsQuery)
export const fetchPublications = () => getActiveClient().fetch<RawPublication[]>(publicationsQuery)
export const fetchNews = () => getActiveClient().fetch<RawNewsItem[]>(newsQuery)
export const fetchPartners = () => getActiveClient().fetch<RawPartner[]>(partnersQuery)
export const fetchHomepage = () => getActiveClient().fetch<RawHomepage | null>(homepageQuery)
export const fetchAboutPage = () => getActiveClient().fetch<RawAboutPage | null>(aboutQuery)
