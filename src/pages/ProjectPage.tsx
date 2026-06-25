import { useParams, Link } from 'react-router-dom';
import { Container, Heading, Box, Image, Text, SimpleGrid, Card, Badge, VStack, HStack, Avatar } from '@chakra-ui/react';
import { projects, contributors } from '../data/sampleData';
import { LuArrowRight, LuUser } from 'react-icons/lu';

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <Container maxW="7xl" mx="auto" py={8}>
        <Text>Project not found</Text>
      </Container>
    );
  }

  const projectContributors = contributors.filter(c => project.contributors.includes(c.id));

  return (
    <Box bg="bg.subtle" minH="100vh">
      {/* Updated Banner Section:
        1. Simplified width to 100% to avoid horizontal scroll issues.
        2. Reduced height to 'shrink' the visual impact.
        3. Changed objectFit to 'contain' so the full width of the image fits without cropping.
      */}
      <Box
        w="100%"
        h={{ base: '150px', md: '250px' }} 
        bg="gray.100" // Adds a subtle background colour for any gaps
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image 
          src={(project as any).bannerUrl || project.imageUrl} 
          alt={project.title} 
          maxW="100%" 
          maxH="100%" 
          objectFit="contain" 
        />
      </Box>

      <Container maxW="7xl" mx="auto" py={12}>
        <VStack gap={12} align="stretch">
          {/* Project Details Card */}
          <Box 
            bg="bg.panel" 
            p={{ base: 6, md: 10 }} 
            borderRadius="2xl" 
            borderWidth="1px" 
            borderColor="border.subtle"
            shadow="sm"
          >
            <VStack align="start" gap={4}>
              <Heading as="h1" size="3xl" letterSpacing="tight" color="fg">
                {project.title}
              </Heading>
              <Badge size="lg" colorPalette="blue" variant="solid">Research Project</Badge>
              <Text fontSize="xl" lineHeight="relaxed" color="fg.muted" whiteSpace="pre-line">
                {project.fullDescription}
              </Text>
            </VStack>
          </Box>
          
          {/* Contributors Section */}
          <Box>
            <Heading as="h2" size="2xl" mb={6} color="fg">Contributors</Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
              {projectContributors.map((contributor) => {
                const isExternal = contributor.role === 'External Collaborator';
                
                const CardContent = (
                  <Box p={6} display="flex" flexDirection="column" alignItems="center" textAlign="center" gap={4} flex="1">
                    <Avatar.Root boxSize="100px" borderRadius="full" borderWidth="2px" borderColor="bg.subtle">
                      <Avatar.Image src={contributor.imageUrl} objectFit="cover" />
                      <Avatar.Fallback justifyContent="center" alignItems="center" display="flex" height="100%" width="100%">
                        <LuUser size="50%" />
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <VStack gap={1} flex="1">
                      <Heading as="h3" size="md" fontWeight="bold" color="fg">{contributor.name}</Heading>
                      <Text color="blue.600" fontSize="sm" fontWeight="medium">{contributor.role}</Text>
                    </VStack>
                    {!isExternal && (
                      <HStack gap={1} color="fg.muted" fontSize="xs" fontWeight="medium" mt={4}>
                        <Text>View Profile</Text>
                        <LuArrowRight />
                      </HStack>
                    )}
                  </Box>
                );

                return (
                <Card.Root 
                  key={contributor.id} 
                  variant="elevated"
                  bg="bg.panel"
                  borderWidth="1px"
                  borderColor="border.subtle"
                  rounded="xl"
                  overflow="hidden"
                  _hover={!isExternal ? { transform: 'translateY(-4px)', shadow: 'md', borderColor: 'blue.400' } : undefined}
                  transition="all 0.2s"
                >
                  {isExternal ? (
                    CardContent
                  ) : (
                    <Link to={`/contributor/${contributor.id}`} style={{ textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {CardContent}
                    </Link>
                  )}
                </Card.Root>
              );
            })}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProjectPage;