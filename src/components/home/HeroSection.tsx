// src/components/home/HeroSection.tsx

import {
  Flex,
  Heading,
  Button,
  Box,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { buttonHoverTap } from './animationVariants';

const MotionHeading = motion(Heading);
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
      {/* TOP CONTENT: Heading */}
      <MotionHeading
        as="h1"
        size={{ base: '4xl', md: '6xl' }} // Increased size for impact since description is gone
        lineHeight="1.1"
        color="white"
        textAlign="center"
        textShadow="0 4px 12px rgba(0,0,0,0.5)" // Shadow for readability
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mt={4} // Slight margin from the very top for aesthetics
      >
        BioSIS Lab
      </MotionHeading>

      {/* BOTTOM CONTENT: Button */}
      {/* The justify="space-between" on the parent Flex pushes this Box to the bottom */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        mb={4} // Slight margin from the very bottom edge
      >
        <MotionButton
          asChild
          size="xl" // Made button larger
          px={12}
          bg="white"
          color="blue.700"
          fontWeight="bold"
          fontSize="lg"
          rounded="full" // Rounded pill shape looks modern
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