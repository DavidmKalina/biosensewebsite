import { Contributor, Project } from '../types';

export const contributors: Contributor[] = [
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
