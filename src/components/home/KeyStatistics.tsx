// src/components/home/KeyStatistics.tsx

import {
  Container,
  SimpleGrid,
  Stat,
  StatGroup,
  Box,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { sectionAnimation } from './animationVariants';

const MotionBox = motion(Box);

interface KeyStatisticsProps {
  teamMembersCount: number;
  phdStudentsCount: number;
  projectsCount: number;
}

export const KeyStatistics = ({
  teamMembersCount,
  phdStudentsCount,
  projectsCount,
}: KeyStatisticsProps) => {
  // Create an array to map over. This is much cleaner and more maintainable.
  const stats = [
    { value: teamMembersCount, label: 'Team Members' },
    { value: phdStudentsCount, label: 'PhD Researchers' },
    { value: projectsCount, label: 'Active Projects' },
  ];

  return (
    <MotionBox py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }} {...sectionAnimation}>
      <Container maxW="6xl">
        <StatGroup as={SimpleGrid} columns={{ base: 1, md: 3 }} gap={8}>
          {stats.map((stat) => (
            <Stat.Root key={stat.label} textAlign="center">
              <Stat.ValueText
                fontSize="4xl"
                fontWeight="bold"
                color="primary" // Changed from "blue.600"
              >
                {stat.value}
              </Stat.ValueText>
              <Stat.Label
                fontSize="lg"
                color="text" // Changed from "gray.600"
                opacity={0.7} // Added opacity for visual hierarchy
              >
                {stat.label}
              </Stat.Label>
            </Stat.Root>
          ))}
        </StatGroup>
      </Container>
    </MotionBox>
  );
};