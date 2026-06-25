import React from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Card,
  Avatar,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { contributors } from '../data/sampleData';
import { LuArrowRight, LuUser } from 'react-icons/lu';

const MotionBox = motion(Box);
const MotionCardRoot = motion(Card.Root);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Team: React.FC = () => {
  const teamMembers = contributors.filter(c => c.id !== 'test' && c.role !== 'External Collaborator');

  return (
    <Box bg="gray.50" _dark={{ bg: 'gray.900' }} minH="100vh" py={{ base: 12, md: 20 }}>
      <Container maxW="7xl">
        <VStack gap={6} textAlign="center" mb={12}>
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading as="h1" size="4xl" mb={4} letterSpacing="tight" color="gray.900" _dark={{ color: "white" }}>
              Meet Our Team
            </Heading>
            <Text fontSize="xl" color="gray.600" _dark={{ color: "gray.400" }} maxW="2xl" mx="auto">
              A diverse group of researchers, students, and innovators dedicated to advancing biosensing technology.
            </Text>
          </MotionBox>
        </VStack>

        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
            {teamMembers.map((member) => (
              <MotionCardRoot
                key={member.id}
                variants={itemVariants}
                overflow="hidden"
                variant="elevated"
                bg="white"
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
                borderWidth="1px"
                borderColor="gray.100"
                rounded="xl"
                _hover={{ transform: 'translateY(-4px)', shadow: 'lg', borderColor: 'blue.200' }}
                transition={{ duration: 0.3 }}
              >
                <RouterLink to={`/contributor/${member.id}/bio`} style={{ textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box pt={8} display="flex" justifyContent="center">
                    <Avatar.Root 
                      boxSize="180px"
                      borderRadius="full"
                      bg="gray.100"
                      overflow="hidden"
                    >
                      <Avatar.Image
                        src={member.imageUrl}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        transition="transform 0.5s ease"
                        _groupHover={{ transform: 'scale(1.05)' }}
                      />
                      <Avatar.Fallback justifyContent="center" alignItems="center" display="flex" height="100%" width="100%">
                        <LuUser size="50%" />
                      </Avatar.Fallback>
                    </Avatar.Root>
                  </Box>

                  <Card.Body p={4} flex="1" display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    <VStack gap={1} w="full">
                      <Heading size="md" fontWeight="bold" lineClamp={1} color="gray.900" _dark={{ color: "white" }}>
                        {member.name}
                      </Heading>
                      
                      <Text color="blue.600" fontSize="sm" fontWeight="medium">
                        {member.role}
                      </Text>

                      <HStack gap={1} mt={3} color="gray.500" fontSize="xs" fontWeight="medium" _groupHover={{ color: "blue.600" }}>
                        <Text>View Profile</Text>
                        <LuArrowRight />
                      </HStack>
                    </VStack>
                  </Card.Body>
                </RouterLink>
              </MotionCardRoot>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Team;
