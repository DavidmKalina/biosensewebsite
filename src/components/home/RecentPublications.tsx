// src/components/home/RecentPublications.tsx

import {
  Container,
  Heading,
  Box,
  Text,
  VStack,
  HStack,
  Link,
  Button,
  Grid,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { publications, Publication } from '../../data/sampleData';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import {
  sectionAnimation,
  containerVariants,
  itemVariants,
  buttonHoverTap,
} from './animationVariants';
import { useMemo } from 'react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

/**
 * Sub-component for rendering a single publication in the list.
 */
const PublicationItem = ({ pub }: { pub: Publication }) => {
  return (
    <MotionBox
      variants={itemVariants}
      py={6}
      borderBottomWidth="1px"
      borderColor="border"
      _last={{ borderBottomWidth: 0 }}
    >
      <Grid
        templateColumns={{ base: '1fr', md: '120px 1fr' }}
        gap={{ base: 2, md: 6 }}
        alignItems="start"
      >
        {/* Column 1: Year Callout */}
        <Text
          fontSize={{ base: 'lg', md: 'xl' }}
          fontWeight="bold"
          color="primary"
          opacity={0.6}
          lineHeight="1.2"
          mt={{ base: 0, md: 1 }}
        >
          {pub.year}
        </Text>

        {/* Column 2: Publication Details */}
        <VStack align="start" gap={1}>
          <Link
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ textDecoration: 'none' }}
          >
            <HStack>
              <Heading
                as="h3"
                size="md"
                _hover={{ color: 'primary' }}
                transition="color 0.2s"
              >
                {pub.title}
              </Heading>
              <Box as={FaExternalLinkAlt} color="gray.400" flexShrink={0} />
            </HStack>
          </Link>
          <Text fontSize="sm" color="text" opacity={0.8}>
            {pub.authors.join(', ')}
          </Text>
          <Text fontSize="sm" fontStyle="italic" color="text" opacity={0.6}>
            {pub.journal}
          </Text>
        </VStack>
      </Grid>
    </MotionBox>
  );
};

export const RecentPublications = () => {
  // Use useMemo to prevent re-sorting on every render
  const recentPublications = useMemo(() => {
    return publications
      .sort((a, b) => b.year - a.year)
      .slice(0, 3);
  }, []); // Empty dependency array means this only runs once

  return (
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
          gap={0}
          align="stretch"
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          borderTopWidth="1px"
          borderColor="border"
        >
          {recentPublications.map((pub) => (
            <PublicationItem key={pub.id} pub={pub} />
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
  );
};