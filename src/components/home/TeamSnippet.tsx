// src/components/home/TeamSnippet.tsx

import {
  Container,
  Heading,
  Grid,
  Image,
  Card,
  Box,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { contributors } from '../../data/sampleData';
import { motion } from 'framer-motion';
import {
  sectionAnimation,
  containerVariants,
  itemVariants,
  cardHoverTap,
  buttonHoverTap,
} from './animationVariants';

const CardRoot = Card.Root as React.ComponentType<
  React.ComponentProps<typeof Card.Root> & React.ComponentProps<typeof RouterLink>
>;
const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const MotionCardRoot = motion(CardRoot);
const MotionButton = motion(Button);

export const TeamSnippet = () => {
  const teamSnippet = contributors.filter((c) => c.id !== 'test').slice(0, 3);

  return (
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
  );
};