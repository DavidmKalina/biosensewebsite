import { Container, Heading, Grid, Image, Card } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ProjectCarousel from '../components/ProjectCarousel';
import { Contributor, Project } from '~/types';

const CardRoot = Card.Root as React.ComponentType<React.ComponentProps<typeof Card.Root> & React.ComponentProps<typeof RouterLink>>;

const Home = ({ contributors, projects }: { contributors: Contributor[]; projects: Project[] }) => {
  return (
    <Container maxW="6xl" mx="auto" py={4}>
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        Science Projects Showcase
      </Heading>
      
      <ProjectCarousel projects={projects} />

      <Heading as="h2" size="lg" mt={12} mb={6}>
        Our Contributors
      </Heading>
      
      <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        {contributors.map((contributor) => (
          <CardRoot as={RouterLink} to={`/contributor/${contributor.id}/bio`} key={contributor.id} _hover={{ textDecoration: 'none', boxShadow: 'md' }}>
            <Image src={contributor.imageUrl} alt={contributor.name} height="200px" objectFit="cover" borderTopRadius="md" />
            <Card.Body>
              <Card.Title>{contributor.name}</Card.Title>
              <Card.Description>{contributor.role}</Card.Description>
            </Card.Body>
          </CardRoot>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
