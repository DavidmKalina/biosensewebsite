// src/components/home/Partners.tsx

import { Container, Heading, Flex, Text, Link, Box } from '@chakra-ui/react';
import { partners } from '../../data/sampleData';
import { motion } from 'framer-motion';
import {
  sectionAnimation,
  containerVariants,
  itemVariants,
} from './animationVariants';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionLink = motion(Link);

export const Partners = () => {
  return (
    <MotionBox
      py={16}
      px={8}
      {...sectionAnimation}
      transition={{ ...sectionAnimation.transition, delay: 0.1 }}
    >
      <Container maxW="6xl">
        <Heading as="h2" size="2xl" mb={10} textAlign="center">
          Our Partners & Collaborators
        </Heading>
        <MotionFlex
          wrap="wrap"
          gap={8}
          justify="center"
          align="center"
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
        >
          {partners.map((partner) => (
            <MotionLink
              key={partner.id}
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              p={4}
              _hover={{ textDecoration: 'none', color: 'primary' }}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Text fontSize="lg" fontWeight="medium" color="gray.600">
                {partner.name}
              </Text>
            </MotionLink>
          ))}
        </MotionFlex>
      </Container>
    </MotionBox>
  );
};