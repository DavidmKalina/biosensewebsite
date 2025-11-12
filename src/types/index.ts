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
  contributors: string[];
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  link: string;
  category: string;
}

// New type for publications
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  url: string;
  doi?: string;
}

// New type for partners
export interface Partner {
  id: string;
  name: string;
  websiteUrl: string;
  // logoUrl: '/images/partners/partner-logo.png'
}