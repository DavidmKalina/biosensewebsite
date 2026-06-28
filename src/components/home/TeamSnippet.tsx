// src/components/home/TeamSnippet.tsx

import {
  Container,
  Heading,
  SimpleGrid,
  Image,
  Box,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useContributors } from '../../hooks/useContent';
import { motion } from 'framer-motion';
import { LuUsers } from 'react-icons/lu';
import {
  containerVariants,
  itemVariants,
} from './animationVariants';

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);

export const TeamSnippet = () => {
  const contributors = useContributors();
  const teamSnippet = contributors.filter((c) => c.id !== 'test' && c.role !== 'External Collaborator').slice(0, 4);

  return (
    <Box py={{ base: 16, md: 24 }} bg="gray.50" _dark={{ bg: 'gray.900' }}>
      <Container maxW="7xl">
        <MotionBox
          textAlign="center"
          mb={16}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading as="h2" size="3xl" mb={4} color="blue.800">
            Meet Our Team
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
            Dedicated researchers and students driving innovation.
          </Text>
        </MotionBox>

        <MotionSimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          gap={8}
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {teamSnippet.map((contributor) => (
            <MotionBox
              key={contributor.id}
              variants={itemVariants}
              textAlign="center"
              className="group"
            >
              <RouterLink to={`/contributor/${contributor.id}/bio`}>
                <Box
                  position="relative"
                  mx="auto"
                  mb={4}
                  w="200px"
                  h="200px"
                  rounded="full"
                  overflow="hidden"
                  borderWidth="4px"
                  borderColor="gray.100"
                  _dark={{ borderColor: 'gray.700' }}
                  transition="border-color 0.3s"
                  _groupHover={{ borderColor: 'blue.500' }}
                >
                  <Image
                    src={contributor.imageUrl}
                    alt={contributor.name}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    transition="transform 0.5s"
                    _groupHover={{ transform: 'scale(1.1)' }}
                  />
                </Box>
                <VStack gap={1}>
                  <Heading size="md" fontWeight="bold">
                    {contributor.name}
                  </Heading>
                  <Text color="blue.600" fontWeight="medium">
                    {contributor.role}
                  </Text>
                </VStack>
              </RouterLink>
            </MotionBox>
          ))}
        </MotionSimpleGrid>

        <Box textAlign="center" mt={16}>
          <Button
            asChild
            size="lg"
            variant="surface"
            colorPalette="blue"
            rounded="full"
            px={8}
          >
            <RouterLink to="/team">
              <LuUsers /> See All Members
            </RouterLink>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};