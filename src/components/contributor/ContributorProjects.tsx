import { SimpleGrid, Card, Image, Heading, Text, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import type { Project } from '../../types';

interface ContributorProjectsProps {
  projects: Project[];
}

const CardRoot = Card.Root as React.ComponentType<React.ComponentProps<typeof Card.Root> & React.ComponentProps<typeof RouterLink>>;

const ContributorProjects: React.FC<ContributorProjectsProps> = ({ projects }) => {
  if (!projects.length) {
    return <Text>No projects found for this contributor.</Text>;
  }
  return (
    <Box mt={6}>
      <Heading as="h4" size="md" mb={4}>Projects Involved</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} >
        {projects.map((project) => (
          <CardRoot as={RouterLink} to={`/project/${project.id}`} key={project.id}>
            <Image src={project.imageUrl} alt={project.title} height="150px" objectFit="cover" borderTopRadius="md" />
            <Card.Body>
              <Card.Title>{project.title}</Card.Title>
              <Card.Description>{project.shortDescription}</Card.Description>
            </Card.Body>
          </CardRoot>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ContributorProjects;
