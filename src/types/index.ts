export interface ResearchPaper {
    title: string;
    url: string;
    publishDate: string; // ISO date string
}

export interface Contributor {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    researchPapers?: ResearchPaper[];
    contributorApiId?: string; // For Semantic Scholar API
}

export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    imageUrl: string;
    contributors: string[]; // Array of contributor IDs
}
