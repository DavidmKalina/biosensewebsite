import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { PortableTextBlock } from '@portabletext/types'
import { sanityClient } from './sanity'

// ---- Shared result shapes -------------------------------------------------

export interface SanityProjectCard {
  id: string
  title: string
  shortDescription: string
  image?: SanityImageSource
  category?: { id: string; title: string }
  subcategory?: { id: string; title: string }
}

export interface SanityProjectFull extends SanityProjectCard {
  fullDescription?: PortableTextBlock[]
  bannerImage?: SanityImageSource
  contributors?: SanityContributorCard[]
}

export interface SanityContributorCard {
  id: string
  name: string
  role?: string
  image?: SanityImageSource
}

export interface SanityContributor extends SanityContributorCard {
  bio?: PortableTextBlock[]
  contributorApiId?: string
}

export interface SanitySubcategory {
  id: string
  title: string
  description?: string
  projects: SanityProjectCard[]
}

export interface SanityCategory {
  id: string
  title: string
  description?: string
  image?: SanityImageSource
  projectCount: number
  subcategories: SanitySubcategory[]
}

export interface SanityPublication {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number
  url: string
  doi?: string
}

export interface SanityNewsItem {
  id: string
  date: string
  title: string
  summary: string
  link: string
  category: string
}

export interface SanityPartner {
  id: string
  name: string
  websiteUrl: string
  logo?: SanityImageSource
}

// ---- GROQ queries ---------------------------------------------------------

const projectCardProjection = `
  "id": slug.current,
  title,
  shortDescription,
  image,
  "subcategory": subcategory->{ "id": slug.current, title },
  "category": subcategory->category->{ "id": slug.current, title }
`

export const allProjectsQuery = `*[_type == "project"] | order(order asc, title asc){
  ${projectCardProjection}
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  ${projectCardProjection},
  fullDescription,
  bannerImage,
  "contributors": contributors[]->{ "id": slug.current, name, role, image }
}`

export const categoriesQuery = `*[_type == "category"] | order(order asc, title asc){
  "id": slug.current,
  title,
  description,
  image,
  "projectCount": count(*[_type == "project" && subcategory->category._ref == ^._id]),
  "subcategories": *[_type == "subcategory" && category._ref == ^._id] | order(order asc, title asc){
    "id": slug.current,
    title,
    description,
    "projects": *[_type == "project" && subcategory._ref == ^._id] | order(order asc, title asc){
      ${projectCardProjection}
    }
  }
}`

export const allContributorsQuery = `*[_type == "contributor"] | order(order asc, name asc){
  "id": slug.current,
  name,
  role,
  bio,
  image,
  contributorApiId
}`

export const contributorBySlugQuery = `*[_type == "contributor" && slug.current == $slug][0]{
  "id": slug.current,
  name,
  role,
  bio,
  image,
  contributorApiId,
  "projects": *[_type == "project" && references(^._id)] | order(order asc, title asc){
    ${projectCardProjection}
  }
}`

export const publicationsQuery = `*[_type == "publication"] | order(year desc, title asc){
  "id": _id,
  title,
  authors,
  journal,
  year,
  url,
  doi
}`

export const newsQuery = `*[_type == "newsItem"] | order(date desc){
  "id": _id,
  "date": date,
  title,
  summary,
  link,
  category
}`

export const partnersQuery = `*[_type == "partner"] | order(order asc, name asc){
  "id": _id,
  name,
  websiteUrl,
  logo
}`

// ---- Convenience fetchers (use with react-query) --------------------------

export const fetchAllProjects = () =>
  sanityClient.fetch<SanityProjectCard[]>(allProjectsQuery)

export const fetchProjectBySlug = (slug: string) =>
  sanityClient.fetch<SanityProjectFull | null>(projectBySlugQuery, { slug })

export const fetchCategories = () =>
  sanityClient.fetch<SanityCategory[]>(categoriesQuery)

export const fetchAllContributors = () =>
  sanityClient.fetch<SanityContributor[]>(allContributorsQuery)

export const fetchContributorBySlug = (slug: string) =>
  sanityClient.fetch<(SanityContributor & { projects: SanityProjectCard[] }) | null>(
    contributorBySlugQuery,
    { slug }
  )

export const fetchPublications = () =>
  sanityClient.fetch<SanityPublication[]>(publicationsQuery)

export const fetchNews = () => sanityClient.fetch<SanityNewsItem[]>(newsQuery)

export const fetchPartners = () => sanityClient.fetch<SanityPartner[]>(partnersQuery)
