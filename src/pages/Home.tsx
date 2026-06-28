// src/pages/Home.tsx

import { Box } from '@chakra-ui/react';

// Import the new section components
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { RecentPublications } from '../components/home/RecentPublications';
import { TeamSnippet } from '../components/home/TeamSnippet';
import { ResearchAreas } from '../components/home/ResearchAreas';
import { HomeCTA } from '../components/home/HomeCTA';
import Seo from '../components/Seo';
import { organizationJsonLd, websiteJsonLd } from '../lib/seo';

const Home = () => {
  return (
    <Box>
      <Seo
        path="/"
        description="BioSIS Lab at the University of Canberra researches biosensing and intelligent systems: objective pain assessment, dementia detection, gait and balance, and VR based pain relief. Explore our projects, team and publications, or partner with us."
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />
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