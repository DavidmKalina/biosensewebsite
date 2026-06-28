import { useQuery } from '@tanstack/react-query'
import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { urlFor, isPreviewMode } from '../lib/sanity'
import * as sample from '../data/sampleData'
import type { Publication, NewsItem } from '../types'
import {
  fetchProjects,
  fetchCategories,
  fetchContributors,
  fetchPublications,
  fetchNews,
  fetchPartners,
  fetchHomepage,
  fetchAboutPage,
} from '../lib/queries'

/**
 * These hooks read content from Sanity via react-query and fall back to the
 * bundled sampleData when Sanity is unconfigured, loading, empty, or erroring.
 * The returned shapes intentionally match the old sampleData shapes so the
 * components needed only minimal changes.
 */

function toUrl(src?: SanityImageSource, width?: number): string {
  if (!src) return ''
  try {
    let builder = urlFor(src)
    if (width) builder = builder.width(width)
    return builder.url()
  } catch {
    return ''
  }
}

const queryOptions = { retry: 1, staleTime: 5 * 60 * 1000 }

// ---- View shapes (match sampleData) ---------------------------------------

export interface ProjectView {
  id: string
  title: string
  shortDescription: string
  fullDescription?: string | PortableTextBlock[]
  imageUrl: string
  bannerUrl?: string
  contributors: string[]
  categoryId?: string
  subcategoryId?: string
}

export interface SubcategoryView {
  id: string
  title: string
  description?: string
}

export interface CategoryView {
  id: string
  title: string
  description?: string
  imageUrl?: string
  subcategories: SubcategoryView[]
}

export interface ContributorView {
  id: string
  name: string
  role?: string
  bio?: string | PortableTextBlock[]
  imageUrl: string
  contributorApiId?: string
}

export interface PartnerView {
  id: string
  name: string
  websiteUrl: string
  logoUrl?: string
}

export interface HomepageView {
  hero?: {
    heading?: string
    subheading?: string
    ctaLabel?: string
    ctaLink?: string
    backgroundImageUrl?: string
  }
  researchAreasHeading?: string
  researchAreasIntro?: string
  researchAreas?: { icon?: string; title?: string; description?: string }[]
  cta?: { heading?: string; text?: string; buttonLabel?: string; buttonLink?: string }
}

export interface AboutView {
  heading?: string
  intro?: string
  groupPhotoUrl?: string
  whoWeAreHeading?: string
  whoWeAre?: PortableTextBlock[]
  features?: { icon?: string; title?: string; description?: string }[]
  missionHeading?: string
  missionStatement?: string
  missionPoints?: string[]
}

// ---- Hooks ----------------------------------------------------------------

export function useProjects(): ProjectView[] {
  const { data } = useQuery({ queryKey: ['projects', isPreviewMode()], queryFn: fetchProjects, ...queryOptions })
  if (!data || data.length === 0) return sample.projects as ProjectView[]
  return data.map((p) => ({
    id: p.id,
    title: p.title,
    shortDescription: p.shortDescription,
    fullDescription: p.fullDescription,
    imageUrl: toUrl(p.image),
    bannerUrl: p.bannerImage ? toUrl(p.bannerImage) : undefined,
    contributors: p.contributors || [],
    categoryId: p.categoryId,
    subcategoryId: p.subcategoryId,
  }))
}

export function useCategories(): CategoryView[] {
  const { data } = useQuery({ queryKey: ['categories', isPreviewMode()], queryFn: fetchCategories, ...queryOptions })
  if (!data || data.length === 0) return sample.categories as CategoryView[]
  return data.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    imageUrl: toUrl(c.image),
    subcategories: c.subcategories || [],
  }))
}

export function useContributors(): ContributorView[] {
  const { data } = useQuery({ queryKey: ['contributors', isPreviewMode()], queryFn: fetchContributors, ...queryOptions })
  if (!data || data.length === 0) return sample.contributors as ContributorView[]
  return data.map((c) => ({
    id: c.id,
    name: c.name,
    role: c.role,
    bio: c.bio,
    imageUrl: toUrl(c.image),
    contributorApiId: c.contributorApiId,
  }))
}

export function usePublications(): Publication[] {
  const { data } = useQuery({ queryKey: ['publications', isPreviewMode()], queryFn: fetchPublications, ...queryOptions })
  if (!data || data.length === 0) return sample.publications
  return data
}

export function useNews(): NewsItem[] {
  const { data } = useQuery({ queryKey: ['news', isPreviewMode()], queryFn: fetchNews, ...queryOptions })
  if (!data || data.length === 0) return sample.latestNews
  return data
}

export function usePartners(): PartnerView[] {
  const { data } = useQuery({ queryKey: ['partners', isPreviewMode()], queryFn: fetchPartners, ...queryOptions })
  if (!data || data.length === 0) return sample.partners as PartnerView[]
  return data.map((p) => ({
    id: p.id,
    name: p.name,
    websiteUrl: p.websiteUrl,
    logoUrl: p.logo ? toUrl(p.logo) : undefined,
  }))
}

export function useHomepage(): HomepageView | null {
  const { data } = useQuery({ queryKey: ['homepage', isPreviewMode()], queryFn: fetchHomepage, ...queryOptions })
  if (!data) return null
  return {
    hero: data.hero
      ? {
          heading: data.hero.heading,
          subheading: data.hero.subheading,
          ctaLabel: data.hero.ctaLabel,
          ctaLink: data.hero.ctaLink,
          backgroundImageUrl: data.hero.backgroundImage
            ? toUrl(data.hero.backgroundImage, 1920)
            : undefined,
        }
      : undefined,
    researchAreasHeading: data.researchAreasHeading,
    researchAreasIntro: data.researchAreasIntro,
    researchAreas: data.researchAreas,
    cta: data.cta,
  }
}

export function useAbout(): AboutView | null {
  const { data } = useQuery({ queryKey: ['about', isPreviewMode()], queryFn: fetchAboutPage, ...queryOptions })
  if (!data) return null
  return {
    heading: data.heading,
    intro: data.intro,
    groupPhotoUrl: data.groupPhoto ? toUrl(data.groupPhoto, 1400) : undefined,
    whoWeAreHeading: data.whoWeAreHeading,
    whoWeAre: data.whoWeAre,
    features: data.features,
    missionHeading: data.missionHeading,
    missionStatement: data.missionStatement,
    missionPoints: data.missionPoints,
  }
}
