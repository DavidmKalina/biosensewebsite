// src/components/home/HeroSection.tsx

import {
  Flex,
  Heading,
  Button,
  Box,
  Text,
  VStack,
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
    <Flex
      as="section"
      w="100%"
      minH={{ base: '70vh', md: '60vh' }}
      direction="column" // Stacks items vertically
      justify="space-between" // Pushes items to the edges (Top and Bottom)
      align="center" // Centers items horizontally
      py={16}
      px={8}
      position="relative"
      
      // BACKGROUND CONFIGURATION
      backgroundImage="url('/images/hero-bg.jpg')"
      backgroundSize="cover"
      backgroundPosition="bottom" // Anchors image to show the bottom (group members)
      backgroundRepeat="no-repeat"
      
      color="white" 
    >
      {/* TOP CONTENT: Titles */}
      <VStack gap={2} mt={4} textAlign="center" zIndex={1}>
        <MotionHeading
          as="h1"
          size={{ base: '4xl', md: '6xl' }}
          lineHeight="1.1"
          color="white"
          textShadow="0 4px 12px rgba(0,0,0,0.5)"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          BioSIS Lab
        </MotionHeading>
        
        <MotionText
          fontSize={{ base: 'xl', md: '3xl' }}
          fontWeight="medium"
          color="gray.100"
          textShadow="0 2px 4px rgba(0,0,0,0.6)"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Biosensing and Intelligence Systems Laboratory
        </MotionText>
      </VStack>

      {/* BOTTOM CONTENT: Button */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        mb={4}
      >
        <MotionButton
          asChild
          size="xl"
          px={12}
          bg="white"
          color="blue.700"
          fontWeight="bold"
          fontSize="lg"
          rounded="full"
          _hover={{ bg: "gray.100", transform: "translateY(-2px)" }}
          shadow="lg"
          {...buttonHoverTap}
        >
          <NavLink to="/about">Learn More</NavLink>
        </MotionButton>
      </MotionBox>
    </Flex>
  );
};