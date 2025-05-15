import { Box, Flex, Heading, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HeadingLink = (props: any) => <Box as={Link} {...props} />;

const Navbar = () => {
  return (
    <Box as="nav" bg="blue.600" py={3} boxShadow="sm" position="fixed" top={0} width="100%" zIndex={1000}>
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
        <HeadingLink
            as={Link}
            to="/about"
            size="md"
            color="white"
            textDecoration="none"
            mx={4}
            _hover={{ color: 'blue.100' }}
          >
            About
          </HeadingLink>
        <HeadingLink
            as={Link}
            to="/get-involved"
            size="md"
            color="white"
            textDecoration="none"
            mx={4}
            _hover={{ color: 'blue.100' }}
          >
            Get Involved
          </HeadingLink>
        <HeadingLink
            as={Link}
            to="/team"
            size="md"
            color="white"
            textDecoration="none"
            mx={4}
            _hover={{ color: 'blue.100' }}
          >
            Team
          </HeadingLink>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
