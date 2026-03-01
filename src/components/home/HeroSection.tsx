// src/components/home/HeroSection.tsx

import {
  Heading,
  Button,
  Box,
  Text,
  VStack,
  Container,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { buttonHoverTap } from './animationVariants';

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionBox = motion(Box);
const MotionButton = motion(Button);

export const HeroSection = () => {
  return (
    <Box
      as="section"
      w="100%"
      minH={{ base: '80vh', md: '90vh' }}
      position="relative"
      overflow="hidden"
    >
      {/* Background Image with Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        backgroundImage="url('/images/hero-bg.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          w: '100%',
          h: '100%',
          bg: 'blackAlpha.300', // Reduced overlay opacity
        }}
        zIndex={0}
      />

      <Container
        maxW="7xl"
        h="100%"
        minH={{ base: '80vh', md: '90vh' }}
        position="relative"
        zIndex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        color="white"
        py={20}
      >
        <VStack gap={6} maxW="4xl">
          <MotionHeading
            as="h1"
            size={{ base: '4xl', md: '6xl', lg: '7xl' }}
            fontWeight="bold"
            lineHeight="1.1"
            letterSpacing="tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            BioSIS Lab
          </MotionHeading>

          <MotionText
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            fontWeight="medium"
            color="whiteAlpha.900"
            maxW="2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Pioneering Biosensing and Intelligence Systems for a Healthier Tomorrow
          </MotionText>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            mt={8}
          >
            <MotionButton
              asChild
              size="xl"
              px={10}
              py={7}
              bg="blue.600"
              color="white"
              fontSize="lg"
              fontWeight="semibold"
              rounded="full"
              _hover={{ bg: "blue.500", transform: "translateY(-2px)", boxShadow: "xl" }}
              _active={{ bg: "blue.700" }}
              shadow="lg"
              {...buttonHoverTap}
            >
              <NavLink to="/about">Discover Our Mission</NavLink>
            </MotionButton>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};