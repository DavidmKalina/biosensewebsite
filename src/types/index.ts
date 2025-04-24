export interface Contributor {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
}

export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    imageUrl: string;
    contributors: string[]; // Array of contributor IDs
}
