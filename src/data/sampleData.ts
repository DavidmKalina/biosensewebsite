import { Contributor, Project } from '../types';

export const contributors: Contributor[] = [
    {
        id: 'dr-jane-smith',
        name: 'Dr. Jane Smith',
        role: 'Lead Researcher',
        bio: 'Dr. Jane Smith is a renowned biologist specializing in marine ecosystems. With over 15 years of research experience, she has published numerous papers on coral reef conservation and marine biodiversity.',
        imageUrl: '/images/contributors/jane-smith.jpg'
    },
    {
        id: 'prof-alex-chen',
        name: 'Prof. Alex Chen',
        role: 'Senior Research Scientist',
        bio: 'Professor Alex Chen is a quantum physicist with expertise in quantum computing and molecular modeling. His groundbreaking work has contributed to advances in quantum entanglement theory.',
        imageUrl: '/images/contributors/alex-chen.jpg'
    },
    {
        id: 'dr-maria-rodriguez',
        name: 'Dr. Maria Rodriguez',
        role: 'Environmental Scientist',
        bio: 'Dr. Maria Rodriguez specializes in climate change research and sustainable development. Her work focuses on developing innovative solutions for environmental conservation.',
        imageUrl: '/images/contributors/maria-rodriguez.jpg'
    }
];

export const projects: Project[] = [
    {
        id: 'coral-reef-restoration',
        title: 'Coral Reef Restoration Project',
        shortDescription: 'Innovative approaches to restore damaged coral reefs using biotechnology and marine science.',
        fullDescription: 'This project combines cutting-edge biotechnology with marine science to develop new methods for coral reef restoration. Using a novel approach to coral propagation, we\'ve successfully increased coral growth rates by 300% while improving resilience to environmental stressors. The project includes extensive field testing in the Great Barrier Reef, with promising results for large-scale reef restoration efforts.',
        imageUrl: '/images/projects/coral-reef.jpg',
        contributors: ['dr-jane-smith', 'dr-maria-rodriguez']
    },
    {
        id: 'quantum-molecular-modeling',
        title: 'Quantum Molecular Modeling',
        shortDescription: 'Using quantum computing to revolutionize molecular modeling for drug discovery.',
        fullDescription: 'This groundbreaking project leverages quantum computing algorithms to simulate complex molecular interactions with unprecedented accuracy. Our team has developed a new quantum-based approach that reduces computational time for drug molecule simulations from months to hours, potentially accelerating the drug discovery process significantly.',
        imageUrl: '/images/projects/quantum-modeling.jpg',
        contributors: ['prof-alex-chen']
    },
    {
        id: 'sustainable-agriculture',
        title: 'Smart Sustainable Agriculture',
        shortDescription: 'Developing AI-powered solutions for sustainable farming practices.',
        fullDescription: 'The Smart Sustainable Agriculture project combines IoT sensors, AI algorithms, and environmental science to optimize farming practices. Our system provides real-time recommendations for water usage, pest control, and crop rotation, resulting in a 40% reduction in water consumption and a 25% increase in crop yield while minimizing environmental impact.',
        imageUrl: '/images/projects/smart-agriculture.jpg',
        contributors: ['dr-maria-rodriguez', 'prof-alex-chen']
    }
];
