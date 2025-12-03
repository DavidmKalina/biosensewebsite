// src/pages/Home.tsx

import { Box } from '@chakra-ui/react';
import { contributors, projects } from '../data/sampleData';

// Import the new section components
import { HeroSection } from '../components/home/HeroSection';
import { KeyStatistics } from '../components/home/KeyStatistics';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { RecentPublications } from '../components/home/RecentPublications';
import { LatestNews } from '../components/home/LatestNews';
import { TeamSnippet } from '../components/home/TeamSnippet';
import { Partners } from '../components/home/Partners';
import { HomeCTA } from '../components/home/HomeCTA';

const Home = () => {
  // Logic needed for props is kept here
  const teamMembersCount = contributors.filter((c) => c.id !== 'test').length;
  const projectsCount = projects.length;
  const phdStudentsCount = contributors.filter(
    (c) => c.role.toLowerCase().includes('phd') && c.id !== 'test'
  ).length;

  return (
    <Box>
      <HeroSection />
      <KeyStatistics
        teamMembersCount={teamMembersCount}
        phdStudentsCount={phdStudentsCount}
        projectsCount={projectsCount}
      />
      <FeaturedProjects />
      <RecentPublications />
      <LatestNews />
      <TeamSnippet />
      <Partners />
      <HomeCTA />
    </Box>
  );
};

export default Home;