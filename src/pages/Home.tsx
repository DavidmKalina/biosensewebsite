import { Container, Heading, Grid, Text, Image, Card, CardBody } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ProjectCarousel from '../components/ProjectCarousel';
import { projects, contributors } from '../data/sampleData';

const Home = () => {
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
          <Card.Root as={RouterLink} to={`/contributor/${contributor.id}/bio`} key={contributor.id} _hover={{ textDecoration: 'none', boxShadow: 'md' }}>
            <Image src={contributor.imageUrl} alt={contributor.name} height="200px" objectFit="cover" borderTopRadius="md" />
            <Card.Body>
              <Card.Title>{contributor.name}</Card.Title>
              <Card.Description>{contributor.role}</Card.Description>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
