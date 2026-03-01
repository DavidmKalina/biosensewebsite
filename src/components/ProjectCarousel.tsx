import { Box, Heading, Image, Card, SimpleGrid } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface ProjectCarouselProps {
  projects: any[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  return (
    <Box py={8} px={{ base: 2, md: 8 }}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Featured Projects
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {projects.map((project) => (
          <Card.Root key={project.id} width="100%">
            <RouterLink to={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
              <Image
                src={project.imageUrl}
                alt={project.title}
                fit="cover"
                maxW="100%"
                borderTopRadius="lg"
              />
              <Card.Body gap="2">
                <Card.Title>{project.title}</Card.Title>
                <Card.Description>
                  {project.shortDescription}
                </Card.Description>
              </Card.Body>
            </RouterLink>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProjectCarousel;
