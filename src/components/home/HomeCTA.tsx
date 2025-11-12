// src/components/home/HomeCTA.tsx

import { Box, VStack, Heading, Text, HStack, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { buttonHoverTap } from './animationVariants';

const MotionButton = motion(Button);

export const HomeCTA = () => {
  return (
    <Box py={20} px={8} bg="blue.700" color="white">
      <VStack as="section" maxW="6xl" mx="auto" gap={6} textAlign="center">
        <Heading as="h2" size="2xl">
          Join Our Mission
        </Heading>
        <Text fontSize="xl" maxW="2xl">
          We are always looking for passionate collaborators, PhD students, and
          partners to help us solve the next generation of scientific
          challenges.
        </Text>
        <HStack gap={6} mt={4}>
          <MotionButton
            asChild
            colorScheme="whiteAlpha"
            bg="white"
            color="blue.700"
            size="lg"
            px={8}
            {...buttonHoverTap}
          >
            <NavLink to="/get-involved">Get Involved</NavLink>
          </MotionButton>
          <MotionButton
            asChild
            variant="outline"
            colorScheme="whiteAlpha"
            size="lg"
            px={8}
            {...buttonHoverTap}
          >
            <NavLink to="/about">Our Research</NavLink>
          </MotionButton>
        </HStack>
      </VStack>
    </Box>
  );
};