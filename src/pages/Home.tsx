// src/pages/Home.tsx

import { Box } from '@chakra-ui/react';

// Import the new section components
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { RecentPublications } from '../components/home/RecentPublications';
import { TeamSnippet } from '../components/home/TeamSnippet';
import { ResearchAreas } from '../components/home/ResearchAreas';
import { HomeCTA } from '../components/home/HomeCTA';

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <ResearchAreas />
      <FeaturedProjects />
      <TeamSnippet />
      <RecentPublications />
      <HomeCTA />
    </Box>
  );
};

export default Home;