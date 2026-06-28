import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  Image,
  Badge,
  HStack,
  Button,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { LuArrowRight, LuArrowLeft, LuFolderOpen } from 'react-icons/lu';
import { useCategories, useProjects } from '../hooks/useContent';
import { containerVariants, itemVariants } from '../components/home/animationVariants';
import Seo from '../components/Seo';
import { breadcrumbJsonLd } from '../lib/seo';

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionCardRoot = motion(Card.Root);

/**
 * Top-level view: a card per research category (drill-down entry point).
 */
const CategoryGrid = () => {
  const categories = useCategories();
  const projects = useProjects();
  return (
    <MotionSimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      gap={10}
      variants={containerVariants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
    >
      {categories.map((category) => {
        const count = projects.filter((p) => p.categoryId === category.id).length;
        return (
          <MotionCardRoot
            key={category.id}
            variants={itemVariants}
            overflow="hidden"
            variant="elevated"
            bg="bg.panel"
            borderWidth="1px"
            borderColor="border.subtle"
            rounded="2xl"
            _hover={{ transform: 'translateY(-8px)', shadow: 'xl', borderColor: 'blue.400' }}
            transition={{ duration: 0.3 }}
            h="full"
            display="flex"
            flexDirection="column"
          >
            <RouterLink
              to={`/projects/${category.id}`}
              style={{ textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Box position="relative" h="200px" overflow="hidden">
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  inset="0"
                  bgGradient="to-t"
                  gradientFrom="blackAlpha.700"
                  gradientTo="transparent"
                  opacity={0.7}
                />
                <Heading
                  as="h3"
                  size="2xl"
                  color="white"
                  position="absolute"
                  bottom={4}
                  left={6}
                  letterSpacing="tight"
                >
                  {category.title}
                </Heading>
              </Box>

              <Card.Body p={6} flex="1" display="flex" flexDirection="column">
                <HStack mb={3}>
                  <Badge colorPalette="blue" variant="subtle" px={2} py={0.5} rounded="md">
                    {count === 1 ? '1 project' : `${count} projects`}
                  </Badge>
                </HStack>
                <Text color="fg.muted" mb={6} flex="1">
                  {category.description}
                </Text>
                <HStack
                  color="blue.600"
                  fontWeight="medium"
                  fontSize="sm"
                  mt="auto"
                  gap={1}
                >
                  <Text>Explore category</Text>
                  <LuArrowRight />
                </HStack>
              </Card.Body>
            </RouterLink>
          </MotionCardRoot>
        );
      })}
    </MotionSimpleGrid>
  );
};

/**
 * Drill-down view: subcategories and their projects within one category.
 */
const CategoryDetail = ({ categoryId }: { categoryId: string }) => {
  const navigate = useNavigate();
  const categories = useCategories();
  const projects = useProjects();
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <VStack gap={6} py={12}>
        <Text fontSize="lg" color="fg.muted">
          That category could not be found.
        </Text>
        <Button colorPalette="blue" onClick={() => navigate('/projects')}>
          <LuArrowLeft /> Back to all categories
        </Button>
      </VStack>
    );
  }

  return (
    <VStack align="stretch" gap={10}>
      <Button
        variant="ghost"
        colorPalette="blue"
        size="sm"
        alignSelf="flex-start"
        onClick={() => navigate('/projects')}
      >
        <LuArrowLeft /> All categories
      </Button>

      {category.subcategories.length === 0 ? (
        <Box
          bg="bg.panel"
          borderWidth="1px"
          borderColor="border.subtle"
          borderStyle="dashed"
          rounded="2xl"
          p={{ base: 10, md: 16 }}
          textAlign="center"
        >
          <Icon as={LuFolderOpen} boxSize={12} color="blue.400" mb={4} />
          <Heading as="h3" size="lg" mb={2} color="fg">
            Projects coming soon
          </Heading>
          <Text color="fg.muted" maxW="lg" mx="auto">
            We are actively building out our {category.title} research. Check back soon for
            projects in this area.
          </Text>
        </Box>
      ) : (
        category.subcategories.map((sub) => {
          const subProjects = projects.filter(
            (p) => p.categoryId === category.id && p.subcategoryId === sub.id
          );
          return (
            <Box key={sub.id}>
              <Heading as="h2" size="xl" color="fg" mb={1}>
                {sub.title}
              </Heading>
              {sub.description && (
                <Text color="fg.muted" mb={6}>
                  {sub.description}
                </Text>
              )}

              {subProjects.length === 0 ? (
                <Text color="fg.muted" fontStyle="italic">
                  Projects coming soon.
                </Text>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
                  {subProjects.map((project) => (
                    <Card.Root
                      key={project.id}
                      overflow="hidden"
                      variant="elevated"
                      bg="bg.panel"
                      borderWidth="1px"
                      borderColor="border.subtle"
                      rounded="2xl"
                      _hover={{ transform: 'translateY(-8px)', shadow: 'xl' }}
                      transition="all 0.3s"
                      h="full"
                      display="flex"
                      flexDirection="column"
                    >
                      <Box position="relative" h="220px" overflow="hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                        />
                      </Box>
                      <Card.Body p={6} flex="1" display="flex" flexDirection="column">
                        <Heading as="h3" size="lg" mb={3} lineClamp={2}>
                          {project.title}
                        </Heading>
                        <Text color="fg.muted" mb={6} flex="1" lineClamp={3}>
                          {project.shortDescription}
                        </Text>
                        <Button
                          asChild
                          variant="outline"
                          colorPalette="blue"
                          size="sm"
                          width="full"
                          mt="auto"
                        >
                          <RouterLink to={`/project/${project.id}`}>
                            View Project <LuArrowRight />
                          </RouterLink>
                        </Button>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </SimpleGrid>
              )}
            </Box>
          );
        })
      )}
    </VStack>
  );
};

const Projects = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categories = useCategories();
  const activeCategory = categoryId
    ? categories.find((c) => c.id === categoryId)
    : undefined;

  return (
    <Box bg="bg.subtle" minH="100vh" py={{ base: 16, md: 20 }}>
      <Seo
        title={activeCategory ? `${activeCategory.title} Research` : 'Research Projects'}
        path={activeCategory ? `/projects/${activeCategory.id}` : '/projects'}
        description={
          activeCategory
            ? `${activeCategory.description} Explore ${activeCategory.title} research projects at BioSIS Lab, University of Canberra.`
            : 'Explore the research projects of BioSIS Lab at the University of Canberra, spanning objective pain assessment, dementia detection, gait and balance, and VR based pain relief.'
        }
        jsonLd={breadcrumbJsonLd(
          activeCategory
            ? [
                { name: 'Home', path: '/' },
                { name: 'Projects', path: '/projects' },
                { name: activeCategory.title, path: `/projects/${activeCategory.id}` },
              ]
            : [
                { name: 'Home', path: '/' },
                { name: 'Projects', path: '/projects' },
              ]
        )}
      />
      <Container maxW="7xl">
        <MotionBox
          textAlign="center"
          mb={16}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Heading as="h1" size="3xl" mb={4} letterSpacing="tight" color="gray.900">
            {activeCategory ? activeCategory.title : 'Research Projects'}
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
            {activeCategory
              ? activeCategory.description
              : 'Explore our work by research area. Select a category to see the projects within it.'}
          </Text>
        </MotionBox>

        {categoryId ? <CategoryDetail categoryId={categoryId} /> : <CategoryGrid />}
      </Container>
    </Box>
  );
};

export default Projects;
