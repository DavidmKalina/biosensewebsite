import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Badge,
  Card,
  Input,
  Flex,
} from '@chakra-ui/react';
import { publications } from '../data/sampleData';
import { LuExternalLink, LuBookOpen, LuSearch } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence

const MotionContainer = motion(Container);
const MotionCard = motion(Card.Root);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Publications = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPublications = [...publications].sort((a, b) => b.year - a.year);

  const displayedPublications = sortedPublications.filter((pub) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      pub.title.toLowerCase().includes(query) ||
      pub.authors.some((author) => author.toLowerCase().includes(query)) ||
      pub.journal.toLowerCase().includes(query) ||
      pub.year.toString().includes(query)
    );
  });

  return (
    <Box bg="bg.subtle" minH="100vh" py={{ base: 12, md: 20 }}>
      <MotionContainer
        maxW="5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <VStack gap={8} align="stretch">
          <VStack gap={6} textAlign="center" mb={8}>
            <Heading as="h1" size="4xl" letterSpacing="tight" color="blue.700">
              Publications
            </Heading>
            <Text fontSize="xl" color="fg.muted" maxW="2xl" mx="auto">
              Explore our research findings and academic contributions.
            </Text>
          </VStack>

          <Box maxW="md" mx="auto" w="full" mb={8}>
            <Flex align="center" bg="white" rounded="md" px={3} shadow="sm" borderWidth="1px" borderColor="border.subtle">
                <LuSearch color="gray" />
                <Input
                  placeholder="Search publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  unstyled
                  bg="transparent"
                  height="12"
                  px={3}
                  color="gray.800"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{ outline: 'none' }}
                />
            </Flex>
          </Box>

          <VStack gap={4} align="stretch">
            {/* Added AnimatePresence here to manage components entering/leaving the DOM */}
            <AnimatePresence mode="popLayout">
              {displayedPublications.length > 0 ? (
                displayedPublications.map((pub) => (
                  <MotionCard
                    key={pub.id}
                    layout // This makes the cards slide up smoothly when a card above them disappears
                    initial="hidden"  // Force it to start hidden when re-mounting
                    animate="visible" // Force it to animate to visible
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }} // Smooth exit animation
                    variants={itemVariants}
                    variant="outline"
                    bg="white"
                    _hover={{ borderColor: 'blue.400', shadow: 'sm' }}
                    transition={{ duration: 0.2 }} // Cleaned up transition string
                  >
                    <Card.Body>
                      <HStack align="start" gap={4}>
                        <Box
                          p={3}
                          bg="blue.50"
                          _dark={{ bg: 'blue.900/20' }}
                          color="blue.600"
                          rounded="lg"
                          display={{ base: 'none', sm: 'block' }}
                        >
                          <LuBookOpen size={24} />
                        </Box>
                        <VStack align="start" gap={2} flex="1">
                          <HStack wrap="wrap" gap={2}>
                            <Badge colorPalette="blue" variant="subtle">
                              {pub.year}
                            </Badge>
                            <Text fontSize="xs" color="fg.muted" fontWeight="medium">
                              {pub.journal}
                            </Text>
                          </HStack>

                          <Link
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            fontWeight="bold"
                            fontSize="lg"
                            lineHeight="short"
                            _hover={{ color: 'blue.600', textDecoration: 'none' }}
                          >
                            {pub.title}
                            <Box as="span" display="inline-block" ml={1} verticalAlign="middle">
                              <LuExternalLink size={14} />
                            </Box>
                          </Link>

                          <Text fontSize="sm" color="fg.muted">
                            {pub.authors.join(', ')}
                          </Text>
                          {pub.doi && (
                              <Text fontSize="xs" color="fg.subtle">
                                  DOI: {pub.doi}
                              </Text>
                          )}
                        </VStack>
                      </HStack>
                    </Card.Body>
                  </MotionCard>
                ))
              ) : (
                <Box textAlign="center" py={10}>
                  <Text color="fg.muted">No publications found matching your search.</Text>
                </Box>
              )}
            </AnimatePresence>
          </VStack>
        </VStack>
      </MotionContainer>
    </Box>
  );
};

export default Publications;