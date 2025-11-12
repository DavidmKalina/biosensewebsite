// src/components/home/HeroSection.tsx

import {
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  Box,
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
      w="100%"
      minH={{ base: '70vh', md: '50vh' }}
      bg="gray.100"
      _dark={{ bg: 'gray.800' }}
      align="center"
      justify="center"
      py={16}
      px={8}
    >
      <VStack as="section" maxW="6xl" mx="auto" gap={6} textAlign="center">
        <MotionHeading
          as="h1"
          size={{ base: '2xl', md: '4xl' }}
          color="primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          BioSense Research Group
        </MotionHeading>
        <MotionText
          fontSize={{ base: 'lg', md: '2xl' }}
          maxW="3xl"
          color="text"
          _dark={{ color: 'gray.300' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Advancing environmental and computational biology through
          cutting-edge research in sustainable agriculture, quantum modeling,
          and marine biotechnology.
        </MotionText>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MotionButton
            asChild
            colorScheme="blue"
            size="lg"
            px={8}
            {...buttonHoverTap}
          >
            <NavLink to="/about">Learn More About Us</NavLink>
          </MotionButton>
        </MotionBox>
      </VStack>
    </Flex>
  );
};