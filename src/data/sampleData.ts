import { Contributor, Project } from '../types';

export const contributors: Contributor[] = [
    {
        id: 'john-doe',
        name: 'John Doe',
        role: 'Research Scientist',
        bio: 'John is a dedicated researcher with a focus on environmental science.',
        imageUrl: 'https://picsum.photos/200?random=1',
        contributorApiId: '',
    },
    {
        id: 'jane-doe',
        name: 'Jane Doe',
        role: 'Data Analyst',
        bio: 'Jane specializes in data analysis and visualization.',
        imageUrl: 'https://picsum.photos/200?random=2',
        contributorApiId: '',
    },
    {
        id: 'alex-smith',
        name: 'Alex Smith',
        role: 'Biologist',
        bio: 'Alex is passionate about studying biodiversity and ecosystems.',
        imageUrl: 'https://picsum.photos/200?random=3',
        contributorApiId: '',
    },
    {
        id: 'lisa-jones',
        name: 'Lisa Jones',
        role: 'Chemist',
        bio: 'Lisa is an expert in chemical research and development.',
        imageUrl: 'https://picsum.photos/200?random=4',
        contributorApiId: '',
    },
    {
        id: 'mike-johnson',
        name: 'Mike Johnson',
        role: 'Physicist',
        bio: 'Mike focuses on theoretical physics and its applications.',
        imageUrl: 'https://picsum.photos/200?random=5',
        contributorApiId: '',
    },
    {
        id: 'susan-lee',
        name: 'Susan Lee',
        role: 'Engineer',
        bio: 'Susan is a skilled engineer with a background in renewable energy.',
        imageUrl: 'https://picsum.photos/200?random=6',
        contributorApiId: '',
    },
    {
        id: 'sumair-aziz',
        name: 'Sumair Aziz',
        role: 'Amazing Researcher',
        bio: 'This is a quick bio about me. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus vehicula sodales. Nulla aliquam ligula enim, et vehicula sapien tempor eu. Donec euismod tempus diam ut mollis. Nullam sit amet nisi in quam porta rhoncus id vel ante. Aliquam gravida nisi ut risus iaculis egestas. Etiam consequat ut mauris et interdum. Fusce justo massa, dictum vel faucibus vel, finibus eu justo. Mauris vel nunc ac justo laoreet fermentum. Fusce id euismod mi, a sollicitudin felis. Donec sed venenatis libero. Nam imperdiet ac mi non ullamcorper. Etiam eget mauris sed felis dignissim dictum sed eu metus. Donec consequat, sem vitae tempus fringilla, nibh dolor fermentum tellus, id pellentesque augue metus ac risus.',
        imageUrl: '/images/contributors/jane-smith.jpg',
        contributorApiId: '27005482',
    },
    {
        id: 'umar-khan',
        name: 'Umar Khan',
        role: 'Amazing Researcher',
        bio: 'This is a quick bio about me. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus vehicula sodales. Nulla aliquam ligula enim, et vehicula sapien tempor eu. Donec euismod tempus diam ut mollis. Nullam sit amet nisi in quam porta rhoncus id vel ante. Aliquam gravida nisi ut risus iaculis egestas. Etiam consequat ut mauris et interdum. Fusce justo massa, dictum vel faucibus vel, finibus eu justo. Mauris vel nunc ac justo laoreet fermentum. Fusce id euismod mi, a sollicitudin felis. Donec sed venenatis libero. Nam imperdiet ac mi non ullamcorper. Etiam eget mauris sed felis dignissim dictum sed eu metus. Donec consequat, sem vitae tempus fringilla, nibh dolor fermentum tellus, id pellentesque augue metus ac risus.',
        imageUrl: '/images/contributors/alex-chen.jpg',

        contributorApiId: '120685296',
    },
    {
        id: 'test',
        name: 'Test Researcher',
        role: 'Test Scientist',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus vehicula sodales. Nulla aliquam ligula enim, et vehicula sapien tempor eu. Donec euismod tempus diam ut mollis. Nullam sit amet nisi in quam porta rhoncus id vel ante. Aliquam gravida nisi ut risus iaculis egestas. Etiam consequat ut mauris et interdum. Fusce justo massa, dictum vel faucibus vel, finibus eu justo. Mauris vel nunc ac justo laoreet fermentum. Fusce id euismod mi, a sollicitudin felis. Donec sed venenatis libero. Nam imperdiet ac mi non ullamcorper. Etiam eget mauris sed felis dignissim dictum sed eu metus. Donec consequat, sem vitae tempus fringilla, nibh dolor fermentum tellus, id pellentesque augue metus ac risus.',
        imageUrl: '/images/contributors/maria-rodriguez.jpg',
    }
];

export const projects: Project[] = [
    {
        id: 'coral-reef-restoration',
        title: 'Coral Reef Restoration Project',
        shortDescription: 'Innovative approaches to restore damaged coral reefs using biotechnology and marine science.',
        fullDescription: 'This project combines cutting-edge biotechnology with marine science to develop new methods for coral reef restoration. Using a novel approach to coral propagation, we\'ve successfully increased coral growth rates by 300% while improving resilience to environmental stressors. The project includes extensive field testing in the Great Barrier Reef, with promising results for large-scale reef restoration efforts.',
        imageUrl: '/images/projects/coral-reef.jpg',
        contributors: ['sumair-aziz', 'umar-khan']
    },
    {
        id: 'quantum-molecular-modeling',
        title: 'Quantum Molecular Modeling',
        shortDescription: 'Using quantum computing to revolutionize molecular modeling for drug discovery.',
        fullDescription: 'This groundbreaking project leverages quantum computing algorithms to simulate complex molecular interactions with unprecedented accuracy. Our team has developed a new quantum-based approach that reduces computational time for drug molecule simulations from months to hours, potentially accelerating the drug discovery process significantly.',
        imageUrl: '/images/projects/quantum-modeling.jpg',
        contributors: ['umar-khan', 'dr-maria-rodriguez']
    },
    {
        id: 'sustainable-agriculture',
        title: 'Smart Sustainable Agriculture',
        shortDescription: 'Developing AI-powered solutions for sustainable farming practices.',
        fullDescription: 'The Smart Sustainable Agriculture project combines IoT sensors, AI algorithms, and environmental science to optimize farming practices. Our system provides real-time recommendations for water usage, pest control, and crop rotation, resulting in a 40% reduction in water consumption and a 25% increase in crop yield while minimizing environmental impact.',
        imageUrl: '/images/projects/smart-agriculture.jpg',
        contributors: ['dr-maria-rodriguez', 'sumair-aziz']
    }
];
