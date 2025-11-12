import {
  Container,
  Heading,
  Grid,
  Image,
  Card,
  Box,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Link,
  Stat,
  StatGroup,
  Tag,
} from '@chakra-ui/react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import {
  contributors,
  latestNews,
  projects,
  publications,
  partners,
} from '../data/sampleData';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const CardRoot = Card.Root as React.ComponentType<
  React.ComponentProps<typeof Card.Root> & React.ComponentProps<typeof RouterLink>
>;
const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionVStack = motion(VStack);
const MotionGrid = motion(Grid);
const MotionCardRoot = motion(CardRoot);
const MotionButton = motion(Button);
const MotionLink = motion(Link);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text); // <-- This line was missing

const Home = () => {
  const teamSnippet = contributors.filter((c) => c.id !== 'test').slice(0, 3);

  const sortedNews = latestNews
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Get recent publications
  const recentPublications = publications
    .sort((a, b) => b.year - a.year) // Simple sort by year
    .slice(0, 3);

  const teamMembersCount = contributors.filter((c) => c.id !== 'test').length;
  const projectsCount = projects.length;
  const phdStudentsCount = contributors.filter(
    (c) => c.role.toLowerCase().includes('phd') && c.id !== 'test'
  ).length;

  // --- Animation Variants ---

  // For the entire section wrapper
  const sectionAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  // For the grid/list container to stagger children
  const containerVariants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    viewport: { once: true },
  };

  // For each item (card) in the grid/list
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // For interactive buttons
  const buttonHoverTap = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  // For interactive cards
  const cardHoverTap = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
  };

  // --- End of Animation Variants ---

  return (
    <Box>
      {/* 1. Hero Section */}
      <Flex
        w="100%"
        minH={{ base: '70vh', md: '50vh' }}
        bg="gray.100"
        _dark={{ bg: 'gray.800' }}
        align="center"
        justify="center"
        py={16}
        px={8}
      >
        <VStack
          as="section"
          maxW="6xl"
          mx="auto"
          gap={6}
          textAlign="center"
        >
          <MotionHeading
            as="h1"
            size={{ base: '2xl', md: '4xl' }}
            color="primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            BioSense Research Group
          </MotionHeading>
          <MotionText
            fontSize={{ base: 'lg', md: '2xl' }}
            maxW="3xl"
            color="text"
            _dark={{ color: 'gray.300' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Advancing environmental and computational biology through
            cutting-edge research in sustainable agriculture, quantum modeling,
            and marine biotechnology.
          </MotionText>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MotionButton
              asChild
              colorScheme="blue"
              size="lg"
              px={8}
              {...buttonHoverTap}
            >
              <NavLink to="/about">Learn More About Us</NavLink>
            </MotionButton>
          </MotionBox>
        </VStack>
      </Flex>

      {/* 2. Key Statistics Section */}
      <MotionBox py={16} px={8} {...sectionAnimation}>
        <Container maxW="6xl">
          <StatGroup as={SimpleGrid} columns={{ base: 1, md: 3 }} gap={8}>
            <Stat.Root textAlign="center">
              <Stat.ValueText
                fontSize="4xl"
                fontWeight="bold"
                color="blue.600"
              >
                {teamMembersCount}
              </Stat.ValueText>
              <Stat.Label fontSize="lg" color="gray.600">
                Team Members
              </Stat.Label>
            </Stat.Root>
            <Stat.Root textAlign="center">
              <Stat.ValueText
                fontSize="4xl"
                fontWeight="bold"
                color="blue.600"
              >
                {phdStudentsCount}
              </Stat.ValueText>
              <Stat.Label fontSize="lg" color="gray.600">
                PhD Researchers
              </Stat.Label>
            </Stat.Root>
            <Stat.Root textAlign="center">
              <Stat.ValueText
                fontSize="4xl"
                fontWeight="bold"
                color="blue.600"
              >
                {projectsCount}
              </Stat.ValueText>
              <Stat.Label fontSize="lg" color="gray.600">
                Active Projects
              </Stat.Label>
            </Stat.Root>
          </StatGroup>
        </Container>
      </MotionBox>

      {/* 3. Featured Projects Section */}
      <MotionBox
        py={16}
        px={8}
        bg="body"
        {...sectionAnimation}
        transition={{ ...sectionAnimation.transition, delay: 0.1 }}
      >
        <Container maxW="6xl">
          <Heading as="h2" size="2xl" mb={10} textAlign="center">
            Featured Projects
          </Heading>
          <MotionSimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={8}
            variants={containerVariants}
            initial="initial"
            whileInView="whileInView"
          >
            {projects.map((project) => (
              <MotionCardRoot
                as={RouterLink}
                to={`/project/${project.id}`}
                key={project.id}
                _hover={{ textDecoration: 'none', boxShadow: 'lg' }}
                variant="outline"
                bg="card"
                variants={itemVariants}
                {...cardHoverTap}
              >
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                  borderTopRadius="md"
                />
                <Card.Body p={6}>
                  <Card.Title as="h3" fontSize="xl" fontWeight="bold">
                    {project.title}
                  </Card.Title>
                  <Card.Description
                    as={Text}
                    fontSize="md"
                    color="text"
                    mt={2}
                  >
                    {project.shortDescription}
                  </Card.Description>
                </Card.Body>
              </MotionCardRoot>
            ))}
          </MotionSimpleGrid>
        </Container>
      </MotionBox>

      {/* 4. Recent Publications Section */}
      <MotionBox
        py={16}
        px={8}
        bg="body"
        {...sectionAnimation}
        transition={{ ...sectionAnimation.transition, delay: 0.2 }}
      >
        <Container maxW="6xl">
          <Heading as="h2" size="2xl" mb={10} textAlign="center">
            Recent Publications
          </Heading>
          <MotionVStack
            gap={6}
            align="stretch"
            variants={containerVariants}
            initial="initial"
            whileInView="whileInView"
          >
            {recentPublications.map((pub) => (
              <MotionBox
                key={pub.id}
                p={5}
                borderWidth="1px"
                borderColor="border"
                borderRadius="md"
                bg="card"
                variants={itemVariants}
                {...cardHoverTap}
              >
                <Link
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <HStack justify="space-between">
                    <Heading as="h3" size="md">
                      {pub.title}
                    </Heading>
                    <Box as={FaExternalLinkAlt} color="gray.500" flexShrink={0} />
                  </HStack>
                </Link>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  {pub.authors.join(', ')}
                </Text>
                <Text fontSize="sm" fontStyle="italic" color="gray.500" mt={1}>
                  {pub.journal}, {pub.year}
                </Text>
              </MotionBox>
            ))}
          </MotionVStack>
          <VStack mt={10}>
            <MotionButton
              asChild
              colorScheme="blue"
              variant="outline"
              size="lg"
              {...buttonHoverTap}
            >
              <NavLink to="/publications">See All Publications</NavLink>
            </MotionButton>
          </VStack>
        </Container>
      </MotionBox>

      {/* 5. Latest News Section */}
      <MotionBox
        py={16}
        px={8}
        {...sectionAnimation}
        transition={{ ...sectionAnimation.transition, delay: 0.3 }}
      >
        <Container maxW="6xl">
          <Heading as="h2" size="2xl" mb={10} textAlign="center">
            Latest News
          </Heading>

          {sortedNews.length === 0 ? (
            <VStack>
              <Text>No news items found.</Text>
            </VStack>
          ) : (
            <MotionSimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={8}
              variants={containerVariants}
              initial="initial"
              whileInView="whileInView"
            >
              {sortedNews.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  {...cardHoverTap}
                >
                  <Card.Root
                    as="article"
                    p={6}
                    variant="outline"
                    bg="card"
                    _hover={{ boxShadow: 'md', borderColor: 'blue.400' }}
                    height="100%" // Ensure cards are same height
                  >
                    <Card.Body>
                      <Tag.Root
                        size="sm"
                        colorScheme="blue"
                        mb={3}
                        variant="solid"
                      >
                        <Tag.Label>{item.category}</Tag.Label>
                      </Tag.Root>
                      <Heading as="h3" size="md" mb={3}>
                        {item.title}
                      </Heading>
                      <Text fontSize="sm" color="gray.600" mb={4}>
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          timeZone: 'UTC',
                        })}
                      </Text>
                      <Text mb={4} lineClamp="3">
                        {item.summary}
                      </Text>
                      <MotionLink
                        asChild
                        colorScheme="blue"
                        fontWeight="medium"
                        whileHover={{ x: 2 }}
                      >
                        <RouterLink to={item.link}>Read More</RouterLink>
                      </MotionLink>
                    </Card.Body>
                  </Card.Root>
                </motion.div>
              ))}
            </MotionSimpleGrid>
          )}
        </Container>
      </MotionBox>

      {/* 6. Team Snippet Section */}
      <MotionBox
        py={16}
        px={8}
        bg="gray.50"
        _dark={{ bg: 'gray.800' }}
        {...sectionAnimation}
        transition={{ ...sectionAnimation.transition, delay: 0.2 }}
      >
        <Container maxW="6xl">
          <Heading as="h2" size="2xl" mb={10} textAlign="center">
            Meet Our Team
          </Heading>
          <MotionGrid
            templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }}
            gap={6}
            variants={containerVariants}
            initial="initial"
            whileInView="whileInView"
          >
            {teamSnippet.map((contributor) => (
              <MotionCardRoot
                as={RouterLink}
                to={`/contributor/${contributor.id}/bio`}
                key={contributor.id}
                _hover={{ textDecoration: 'none', boxShadow: 'lg' }}
                variant="outline"
                bg="card"
                variants={itemVariants}
                {...cardHoverTap}
              >
                <Image
                  src={contributor.imageUrl}
                  alt={contributor.name}
                  height="240px"
                  objectFit="cover"
                  borderTopRadius="md"
                />
                <Card.Body textAlign="center" p={6}>
                  <Card.Title as="h3" fontSize="xl" fontWeight="bold">
                    {contributor.name}
                  </Card.Title>
                  <Card.Description
                    as={Text}
                    fontSize="md"
                    color="blue.600"
                    mt={2}
                  >
                    {contributor.role}
                  </Card.Description>
                </Card.Body>
              </MotionCardRoot>
            ))}
          </MotionGrid>
          <VStack mt={10}>
            <MotionButton
              asChild
              colorScheme="blue"
              variant="outline"
              size="lg"
              {...buttonHoverTap}
            >
              <NavLink to="/team">See All Members</NavLink>
            </MotionButton>
          </VStack>
        </Container>
      </MotionBox>

      {/* 7. Partners Section */}
      <MotionBox
        py={16}
        px={8}
        {...sectionAnimation}
        transition={{ ...sectionAnimation.transition, delay: 0.1 }}
      >
        <Container maxW="6xl">
          <Heading as="h2" size="2xl" mb={10} textAlign="center">
            Our Partners & Collaborators
          </Heading>
          <MotionFlex
            wrap="wrap"
            gap={8}
            justify="center"
            align="center"
            variants={containerVariants}
            initial="initial"
            whileInView="whileInView"
          >
            {partners.map((partner) => (
              <MotionLink
                key={partner.id}
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                p={4}
                _hover={{ textDecoration: 'none', color: 'primary' }}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Text fontSize="lg" fontWeight="medium" color="gray.600">
                  {partner.name}
                </Text>
              </MotionLink>
            ))}
          </MotionFlex>
        </Container>
      </MotionBox>

      {/* 8. Call to Action Section */}
      <Box py={20} px={8} bg="blue.700" color="white">
        <VStack as="section" maxW="6xl" mx="auto" gap={6} textAlign="center">
          <Heading as="h2" size="2xl">
            Join Our Mission
          </Heading>
          <Text fontSize="xl" maxW="2xl">
            We are always looking for passionate collaborators, PhD students,
            and partners to help us solve the next generation of scientific
            challenges.
          </Text>
          <HStack gap={6} mt={4}>
            <MotionButton
              asChild
              colorScheme="whiteAlpha"
              bg="white"
              color="blue.700"
              size="lg"
              px={8}
              {...buttonHoverTap}
            >
              <NavLink to="/get-involved">Get Involved</NavLink>
            </MotionButton>
            <MotionButton
              asChild
              variant="outline"
              colorScheme="whiteAlpha"
              size="lg"
              px={8}
              {...buttonHoverTap}
            >
              <NavLink to="/about">Our Research</NavLink>
            </MotionButton>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;