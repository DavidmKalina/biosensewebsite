// src/components/home/LatestNews.tsx

import {
  Container,
  Heading,
  Card,
  Box,
  Text,
  VStack,
  SimpleGrid,
  Link,
  Tag,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useNews } from '../../hooks/useContent';
import { NewsItem } from '../../types'; // <-- Corrected import path
import { motion } from 'framer-motion';
import {
  sectionAnimation,
  containerVariants,
  itemVariants,
  cardHoverTap,
} from './animationVariants';
import { useMemo } from 'react';

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionLink = motion(Link);

// Create a date formatter outside the component to avoid re-creation on render
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/**
 * Sub-component for rendering a single news card.
 * This cleans up the main component's render method significantly.
 */
const NewsCard = ({ item }: { item: NewsItem }) => {
  return (
    <motion.div
      key={item.id}
      variants={itemVariants}
      {...cardHoverTap}
      style={{ height: '100%' }} // Use style for framer-motion component
    >
      <Card.Root
        as="article"
        p={6}
        variant="outline"
        bg="card"
        _hover={{ boxShadow: 'md', borderColor: 'blue.400' }}
        height="100%"
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
          <Heading as="h3" size="md" mb={3} color="primary">
            {item.title}
          </Heading>
          <Text
            fontSize="sm"
            color="text"
            opacity={0.7}
            mb={4}
          >
            {dateFormatter.format(new Date(item.date))}
          </Text>
          <Text mb={4} lineClamp="3">
            {item.summary}
          </Text>
          <MotionLink
            asChild
            color="primary"
            fontWeight="medium"
            whileHover={{ x: 2 }}
          >
            <RouterLink to={item.link}>Read More</RouterLink>
          </MotionLink>
        </Card.Body>
      </Card.Root>
    </motion.div>
  );
};

export const LatestNews = () => {
  const latestNews = useNews();
  // Use useMemo to prevent re-sorting on every render
  const sortedNews = useMemo(() => {
    return [...latestNews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, [latestNews]);

  return (
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
              <NewsCard key={item.id} item={item} />
            ))}
          </MotionSimpleGrid>
        )}
      </Container>
    </MotionBox>
  );
};