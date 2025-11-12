// src/components/home/FeaturedProjects.tsx

import {
  Container,
  Heading,
  Image,
  Card,
  Box,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { projects } from '../../data/sampleData';
import { motion } from 'framer-motion';
import {
  sectionAnimation,
  containerVariants,
  itemVariants,
  cardHoverTap,
} from './animationVariants';

const CardRoot = Card.Root as React.ComponentType<
  React.ComponentProps<typeof Card.Root> & React.ComponentProps<typeof RouterLink>
>;
const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionCardRoot = motion(CardRoot);

export const FeaturedProjects = () => {
  return (
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
                <Card.Description as={Text} fontSize="md" color="text" mt={2}>
                  {project.shortDescription}
                </Card.Description>
              </Card.Body>
            </MotionCardRoot>
          ))}
        </MotionSimpleGrid>
      </Container>
    </MotionBox>
  );
};