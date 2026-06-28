import { Box, Container, Heading, SimpleGrid, Text, Icon, VStack } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import {
  LuActivity,
  LuBrain,
  LuStethoscope,
  LuHeart,
  LuMicroscope,
  LuCpu,
} from 'react-icons/lu';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from './animationVariants';
import { useHomepage } from '../../hooks/useContent';

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);

const iconMap: Record<string, IconType> = {
  activity: LuActivity,
  brain: LuBrain,
  stethoscope: LuStethoscope,
  heart: LuHeart,
  microscope: LuMicroscope,
  cpu: LuCpu,
};

const defaultAreas = [
  { icon: 'activity', title: 'Biosensing', description: 'Advanced sensors for real-time physiological monitoring.' },
  { icon: 'brain', title: 'Artificial Intelligence', description: 'Machine learning algorithms for predictive health analytics.' },
  { icon: 'stethoscope', title: 'Healthcare Systems', description: 'Integrated systems for clinical and remote patient care.' },
];

export const ResearchAreas = () => {
  const home = useHomepage();
  const heading = home?.researchAreasHeading || 'Our Research Areas';
  const intro = home?.researchAreasIntro || 'Multidisciplinary approaches to solving complex problems.';
  const areas =
    home?.researchAreas && home.researchAreas.length > 0 ? home.researchAreas : defaultAreas;

  return (
    <Box py={{ base: 16, md: 24 }} bg="white">
      <Container maxW="7xl">
        <MotionBox
          textAlign="center"
          mb={16}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading as="h2" size="3xl" mb={4} color="gray.900">
            {heading}
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
            {intro}
          </Text>
        </MotionBox>
        <MotionSimpleGrid columns={{ base: 1, md: 3 }} gap={6} variants={containerVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
          {areas.map((area, i) => (
            <MotionBox key={area.title || i} variants={itemVariants} p={6} borderRadius="xl" bg="gray.50" _hover={{ bg: 'blue.50', transform: 'translateY(-5px)' }} transition={{ duration: 0.3 }}>
              <VStack gap={3}>
                <Box p={2.5} bg="white" borderRadius="lg" boxShadow="sm">
                  <Icon as={iconMap[area.icon || 'activity'] || LuActivity} boxSize={8} color="blue.600" />
                </Box>
                <Heading size="md" color="gray.900">{area.title}</Heading>
                <Text color="gray.600" textAlign="center" fontSize="sm">{area.description}</Text>
              </VStack>
            </MotionBox>
          ))}
        </MotionSimpleGrid>
      </Container>
    </Box>
  );
};
