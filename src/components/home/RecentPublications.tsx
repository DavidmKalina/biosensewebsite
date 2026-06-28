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
  Badge,
  Card,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { usePublications } from '../../hooks/useContent';
import { Publication } from '../../types'; // <-- FIX: Importing the type from the correct module
import { motion } from 'framer-motion';
import { LuExternalLink, LuBookOpen } from 'react-icons/lu';
import {
  containerVariants,
  itemVariants,
} from './animationVariants';
import { useMemo } from 'react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const PublicationItem = ({ pub }: { pub: Publication }) => {
  return (
    <MotionBox variants={itemVariants} w="full">
      <Card.Root
        variant="outline"
        size="sm"
        _hover={{ borderColor: 'blue.400', shadow: 'sm' }}
        transition="all 0.2s"
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
              
              <Text fontSize="sm" color="fg.muted" lineClamp={2}>
                {pub.authors.join(', ')}
              </Text>
            </VStack>
          </HStack>
        </Card.Body>
      </Card.Root>
    </MotionBox>
  );
};

export const RecentPublications = () => {
  const publications = usePublications();
  // Use useMemo to prevent re-sorting on every render
  const recentPublications = useMemo(() => {
    return [...publications]
      .sort((a, b) => b.year - a.year)
      .slice(0, 3);
  }, [publications]);

  return (
    <Box py={{ base: 16, md: 24 }} bg="white">
      <Container maxW="4xl">
        <MotionBox
          textAlign="center"
          mb={12}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading as="h2" size="3xl" mb={4} color="gray.900">
            Recent Publications
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Latest research findings from our laboratory.
          </Text>
        </MotionBox>

        <MotionVStack
          gap={4}
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {recentPublications.map((pub) => (
            <PublicationItem key={pub.id} pub={pub} />
          ))}
        </MotionVStack>

        <Box textAlign="center" mt={10}>
          <Button
            asChild
            variant="outline"
            size="lg"
            colorPalette="blue"
          >
            <NavLink to="/publications">See All Publications</NavLink>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};