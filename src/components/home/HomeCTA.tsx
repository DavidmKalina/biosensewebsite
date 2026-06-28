import { Box, Container, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHomepage } from '../../hooks/useContent';

const MotionBox = motion(Box);

export const HomeCTA = () => {
  const cta = useHomepage()?.cta;
  const heading = cta?.heading || 'Ready to Collaborate?';
  const text =
    cta?.text || 'Join us in our mission to advance biosensing technology and improve global health outcomes.';
  const buttonLabel = cta?.buttonLabel || 'Contact Us';
  const buttonLink = cta?.buttonLink || '/contact';
  return (
    <Box bg="blue.900" py={24} color="white" position="relative" overflow="hidden">
      {/* Decorative background element */}
      <Box position="absolute" top="0" left="0" w="full" h="full" opacity="0.1" bgImage="radial-gradient(circle at 70% 50%, white 0%, transparent 50%)" pointerEvents="none" />
      
      <Container maxW="4xl" position="relative" zIndex={1}>
        <MotionBox
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading size="3xl" mb={6} letterSpacing="tight">{heading}</Heading>
          <Text fontSize="xl" mb={10} opacity={0.9} maxW="2xl" mx="auto">
            {text}
          </Text>
          <Button asChild size="xl" bg="white" color="blue.900" _hover={{ bg: "gray.100", transform: "scale(1.05)" }} rounded="full" px={10}>
            <RouterLink to={buttonLink}>{buttonLabel}</RouterLink>
          </Button>
        </MotionBox>
      </Container>
    </Box>
  );
};