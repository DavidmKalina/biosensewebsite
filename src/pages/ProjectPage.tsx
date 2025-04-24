import { useParams, Link } from 'react-router-dom';
import { Container, Heading, Box, Image, Text, SimpleGrid, Card, Badge } from '@chakra-ui/react';
import { projects, contributors } from '../data/sampleData';

const CardRoot = Card.Root as React.ComponentType<React.ComponentProps<typeof Card.Root> & React.ComponentProps<typeof Link>>;

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <Container maxW="6xl" mx="auto" py={8}>
        <Text>Project not found</Text>
      </Container>
    );
  }

  const projectContributors = contributors.filter(c => project.contributors.includes(c.id));

  return (
    <Container maxW="6xl" mx="auto" py={8}>
      <Heading as="h1" size="xl" mb={6}>{project.title}</Heading>
      <Card.Root mb={8} overflow="hidden">
        <Image src={project.imageUrl} alt={project.title} h={{ base: '200px', md: '400px' }} w="100%" objectFit="cover" />
      </Card.Root>
      <Text fontSize="lg" mb={8}>{project.fullDescription}</Text>
      <Box mt={8}>
        <Heading as="h2" size="md" mb={4}>Contributors</Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }}>
          {projectContributors.map((contributor) => (
            <CardRoot as={Link} to={`/contributor/${contributor.id}`} key={contributor.id} _hover={{ boxShadow: 'lg', textDecoration: 'none' }} display="flex" alignItems="center" p={4}>
              <Image src={contributor.imageUrl} alt={contributor.name} boxSize="80px" borderRadius="full" mr={4} />
              <Card.Body p={0}>
                <Heading as="h3" size="sm">{contributor.name}</Heading>
                <Badge colorScheme="blue" mt={2}>{contributor.role}</Badge>
              </Card.Body>
            </CardRoot>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default ProjectPage;
