import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Text,
  Link,
  HStack,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useCategories } from '../hooks/useContent';

const Footer = () => {
  const categories = useCategories();
  return (
    <Box
      as="footer"
      bg="gray.100"
      color="gray.700"
      _dark={{
        bg: 'gray.900',
        color: 'gray.400',
      }}
      py={{ base: 10, md: 14 }}
      borderTopWidth="1px"
      borderColor="border"
    >
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
          {/* Column 1: Navigation */}
          <VStack align="start" gap={3}>
            <Text fontWeight="bold" fontSize="lg" color="text">
              Navigate
            </Text>
            <Link asChild _hover={{ color: 'primary' }}>
              <RouterLink to="/">Home</RouterLink>
            </Link>
            <Link asChild _hover={{ color: 'primary' }}>
              <RouterLink to="/about">About</RouterLink>
            </Link>
            <Link asChild _hover={{ color: 'primary' }}>
              <RouterLink to="/team">Team</RouterLink>
            </Link>
            <Link asChild _hover={{ color: 'primary' }}>
              <RouterLink to="/contact">Contact Us</RouterLink>
            </Link>
          </VStack>

          {/* Column 2: Research */}
          <VStack align="start" gap={3}>
            <Text fontWeight="bold" fontSize="lg" color="text">
              Research
            </Text>
            {categories.map((category) => (
              <Link key={category.id} asChild _hover={{ color: 'primary' }}>
                <RouterLink to={`/projects/${category.id}`}>
                  {category.title}
                </RouterLink>
              </Link>
            ))}
            <Link asChild _hover={{ color: 'primary' }} fontWeight="medium">
              <RouterLink to="/projects">All Projects</RouterLink>
            </Link>
          </VStack>

          {/* Column 3: External */}
          <VStack align="start" gap={3}>
            <Text fontWeight="bold" fontSize="lg" color="text">
              Resources
            </Text>
            <Link
              href="https://www.canberra.edu.au"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ color: 'primary' }}
            >
              University of Canberra
            </Link>
            <Link
              href="https://www.canberra.edu.au/research"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ color: 'primary' }}
            >
              UC Research
            </Link>
            <Link
              href="https://www.canberra.edu.au/future-students"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ color: 'primary' }}
            >
              Future Students
            </Link>
          </VStack>

          {/* Column 4: Social */}
          <VStack align="start" gap={3}>
            <Text fontWeight="bold" fontSize="lg" color="text">
              Connect
            </Text>
            <HStack gap={2}>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <IconButton
                  aria-label="GitHub"
                  variant="surface"
                  colorPalette="blue"
                  size="sm"
                >
                  <FaGithub size="24px" />
                </IconButton>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <IconButton
                  aria-label="LinkedIn"
                  variant="surface"
                  colorPalette="blue"
                  size="sm"
                >
                  <FaLinkedin size="24px" />
                </IconButton>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <IconButton
                  aria-label="Twitter"
                  variant="surface"
                  colorPalette="blue"
                  size="sm"
                >
                  <FaTwitter size="24px" />
                </IconButton>
              </Link>
            </HStack>
          </VStack>
        </SimpleGrid>

        <Flex
          borderTopWidth="1px"
          borderColor="border"
          mt={10}
          pt={6}
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
        >
          <Text fontSize="sm" textAlign="center">
            © {new Date().getFullYear()} BioSIS Lab | University of Canberra
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;