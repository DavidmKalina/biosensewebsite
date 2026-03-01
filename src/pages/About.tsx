import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  List,
  HStack,
  Icon,
  Separator,
  Card,
  Link,
  Image,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { LuCheck, LuMapPin, LuUsers, LuTarget } from 'react-icons/lu';
import { partners } from '../data/sampleData';

const MotionContainer = motion(Container);

const About: React.FC = () => {
  return (
    <Box bg="bg.subtle" minH="100vh" py={{ base: 12, md: 20 }}>
      <MotionContainer
        maxW="4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <VStack gap={12} align="stretch">
          {/* Header Section */}
          <VStack gap={6} textAlign="center">
            <Heading as="h1" size="4xl" letterSpacing="tight" color="blue.700">
              About BioSIS Lab
            </Heading>
            <Text fontSize="xl" color="fg.muted" maxW="2xl" mx="auto">
              A collaborative research initiative at the University of Canberra, driving innovation in biosensing and intelligent systems.
            </Text>
          </VStack>

          <Separator borderColor="border.muted" />

          {/* Group Photo */}
          <Box borderRadius="2xl" overflow="hidden" boxShadow="md">
            <Image
              src="/images/group-photo.jpg"
              alt="BioSIS Lab Team"
              w="100%"
              h="auto"
              objectFit="cover"
            />
          </Box>

          {/* Who We Are Section */}
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} alignItems="center">
            <Box>
              <Heading as="h2" size="2xl" mb={4} color="gray.900">
                Who We Are
              </Heading>
              <Text fontSize="lg" color="fg.muted" lineHeight="relaxed" mb={4}>
                We are a dynamic group of researchers and academics who established this group to foster deep collaboration on cutting-edge projects.
              </Text>
              <Text fontSize="lg" color="fg.muted" lineHeight="relaxed">
                Recognising that the most significant breakthroughs happen at the intersection of disciplines, we created BioSIS as a platform to share knowledge, resources, and expertise.
              </Text>
            </Box>
            <Box
              bg="white"
              p={8}
              rounded="2xl"
              shadow="sm"
              borderWidth="1px"
              borderColor="border.subtle"
            >
              <VStack align="start" gap={6}>
                <HStack gap={3} align="start">
                  <Icon as={LuUsers} color="blue.500" boxSize={6} mt={1} />
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" color="gray.900">Multidisciplinary Expertise</Text>
                    <Text color="fg.muted" fontSize="sm">Bringing together diverse expertise to solve complex problems.</Text>
                  </Box>
                </HStack>
                
                <Separator borderColor="border.muted" />

                <HStack gap={3} align="start">
                  <Icon as={LuMapPin} color="blue.500" boxSize={6} mt={1} />
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" color="gray.900">University of Canberra</Text>
                    <Text color="fg.muted" fontSize="sm">Proudly based in Australia's capital, leveraging world-class academic facilities.</Text>
                  </Box>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Mission Section */}
          <Box bg="blue.900" color="white" p={{ base: 8, md: 12 }} rounded="3xl" position="relative" overflow="hidden">
             {/* Decorative background circle */}
             <Box position="absolute" top="-20%" right="-10%" boxSize="300px" bg="whiteAlpha.100" rounded="full" />
             
             <VStack align="start" gap={6} position="relative" zIndex={1}>
                <HStack gap={3}>
                  <Icon as={LuTarget} color="blue.200" boxSize={8} />
                  <Heading as="h2" size="2xl">Our Mission</Heading>
                </HStack>
                <Text fontSize="xl" opacity={0.9} maxW="3xl">
                  To advance the frontiers of biosensing technology and intelligence systems through research, collaboration, and a commitment to impactful real-world applications.
                </Text>
                
                <List.Root gap={3} variant="plain">
                  <List.Item display="flex" alignItems="center">
                    <List.Indicator asChild color="blue.300">
                      <LuCheck />
                    </List.Indicator>
                    <Text>Developing novel biosensors for healthcare monitoring</Text>
                  </List.Item>
                  <List.Item display="flex" alignItems="center">
                    <List.Indicator asChild color="blue.300">
                      <LuCheck />
                    </List.Indicator>
                    <Text>Applying AI/ML to interpret complex biological data</Text>
                  </List.Item>
                  <List.Item display="flex" alignItems="center">
                    <List.Indicator asChild color="blue.300">
                      <LuCheck />
                    </List.Indicator>
                    <Text>Mentoring the next generation of researchers</Text>
                  </List.Item>
                </List.Root>
             </VStack>
          </Box>

          {/* Partners Section */}
          <Box>
            <Heading as="h2" size="xl" mb={8} textAlign="center" color="gray.900">
              Our Partners & Collaborators
            </Heading>
            <Flex justify="center" gap={6} wrap="wrap">
              {partners.map((partner) => (
                <Card.Root key={partner.id} variant="outline" bg="white" _hover={{ borderColor: 'blue.400', shadow: 'sm' }} width={{ base: "100%", sm: "300px" }}>
                  <Card.Body p={6} textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                    <Text fontWeight="semibold" color="gray.700">{partner.name}</Text>
                    {partner.websiteUrl && (
                      <Link 
                        href={partner.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        fontSize="sm" 
                        color="blue.600" 
                        mt={2}
                      >
                        Visit Website
                      </Link>
                    )}
                  </Card.Body>
                </Card.Root>
              ))}
            </Flex>
          </Box>

        </VStack>
      </MotionContainer>
    </Box>
  );
};

export default About;
