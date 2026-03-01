// src/components/home/FeaturedProjects.tsx

import {
  Container,
  Heading,
  Image,
  Card,
  Box,
  Text,
  SimpleGrid,
  Badge,
  HStack,
  Button,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { projects } from '../../data/sampleData';
import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import {
  containerVariants,
  itemVariants,
} from './animationVariants';

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionCardRoot = motion(Card.Root);

export const FeaturedProjects = () => {
  return (
    <Box py={{ base: 16, md: 24 }} bg="gray.50">
      <Container maxW="7xl">
        <MotionBox
          textAlign="center"
          mb={16}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading as="h2" size="3xl" mb={4} letterSpacing="tight" color="gray.900">
            Featured Projects
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
            Exploring the frontiers of biosensing technology and intelligent systems.
          </Text>
        </MotionBox>

        <MotionSimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={10}
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <MotionCardRoot
              key={project.id}
              variants={itemVariants}
              overflow="hidden"
              variant="elevated"
              bg="bg.panel"
              borderWidth="1px"
              borderColor="border.subtle"
              rounded="2xl"
              _hover={{ transform: 'translateY(-8px)', shadow: 'xl' }}
              transition={{ duration: 0.3 }}
              h="full"
              display="flex"
              flexDirection="column"
            >
              <Box position="relative" h="240px" overflow="hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  transition="transform 0.5s ease"
                  _groupHover={{ transform: 'scale(1.05)' }}
                />
                <Box
                  position="absolute"
                  inset="0"
                  bgGradient="to-t"
                  gradientFrom="blackAlpha.600"
                  gradientTo="transparent"
                  opacity={0.6}
                />
              </Box>
              
              <Card.Body p={6} flex="1" display="flex" flexDirection="column">
                <HStack mb={3}>
                  <Badge colorPalette="blue" variant="solid" px={2} py={0.5} rounded="md">
                    Research
                  </Badge>
                </HStack>
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
            </MotionCardRoot>
          ))}
        </MotionSimpleGrid>
      </Container>
    </Box>
  );
};