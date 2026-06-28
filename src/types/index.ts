export interface Contributor {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  contributorApiId?: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  bannerUrl?: string;
  contributors: string[];
  categoryId: string;
  subcategoryId: string;
}

export interface Subcategory {
  id: string;
  title: string;
  description?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  subcategories: Subcategory[];
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  link: string;
  category: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  url: string;
  doi?: string;
}

// Alias for legacy components to prevent build errors
export type ResearchPaper = Publication;

export interface Partner {
  id: string;
  name: string;
  websiteUrl: string;
}
