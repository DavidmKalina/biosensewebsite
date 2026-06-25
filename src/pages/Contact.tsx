import { Box, Container, Heading, Text, VStack, Link, Icon, HStack } from '@chakra-ui/react';
import { LuMail } from 'react-icons/lu';
import { motion } from 'framer-motion';

const MotionContainer = motion(Container);

const Contact = () => {
  return (
    <Box bg="bg.subtle" minH="100vh" py={{ base: 12, md: 20 }}>
      <MotionContainer
        maxW="2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <VStack gap={8} textAlign="center" bg="bg.panel" p={10} borderRadius="2xl" boxShadow="sm" borderWidth="1px" borderColor="border.subtle">
          <Heading size="3xl" letterSpacing="tight">Contact Us</Heading>
          <Text fontSize="xl" color="fg.muted">
            Interested in our research or want to get involved? Reach out to us directly.
          </Text>
          
          <VStack gap={4} mt={4}>
            <Heading size="md">Raul Fernandez Rojas</Heading>
            <HStack gap={2} color="blue.600" fontSize="lg">
                <Icon as={LuMail} />
                <Link href="mailto:Raul.FernandezRojas@canberra.edu.au" fontWeight="medium">
                    Raul.FernandezRojas@canberra.edu.au
                </Link>
            </HStack>
          </VStack>
        </VStack>
      </MotionContainer>
    </Box>
  );
};

export default Contact;