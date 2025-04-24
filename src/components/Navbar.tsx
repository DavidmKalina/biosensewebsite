import { Box, Flex, Heading, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box as="nav" bg="blue.600" py={3} boxShadow="sm">
      <Container maxW="6xl">
        <Flex align="center" justify="flex-start">
          <Heading
            as={Link}
            to="/"
            size="md"
            color="white"
            textDecoration="none"
            flexGrow={1}
            _hover={{ color: 'blue.100' }}
          >
            BioSense Projects
          </Heading>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
