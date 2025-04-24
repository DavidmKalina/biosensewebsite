import { Box, Flex, Heading, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HeadingLink = Heading as React.ComponentType<React.ComponentProps<typeof Heading> & React.ComponentProps<typeof Link>>;

const Navbar = () => {
  return (
    <Box as="nav" bg="blue.600" py={3} boxShadow="sm">
      <Container maxW="6xl">
        <Flex align="center" justify="flex-start">
          <HeadingLink
            as={Link}
            to="/"
            size="md"
            color="white"
            textDecoration="none"
            flexGrow={1}
            _hover={{ color: 'blue.100' }}
          >
            BioSense Projects
          </HeadingLink>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
