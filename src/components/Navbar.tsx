import {
  Box,
  Flex,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaHome, FaInfoCircle, FaUsers, FaHandshake } from 'react-icons/fa'; // Example icons

const NavLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ElementType }) => (
  <ChakraLink
    as={RouterLink}
    to={href}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'blue.700',
    }}
    color="white"
    display="flex"
    alignItems="center"
  >
    {icon && <Box as={icon} mr={2} />}
    {children}
  </ChakraLink>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const links = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'About', path: '/about', icon: FaInfoCircle },
    { name: 'Get Involved', path: '/get-involved', icon: FaHandshake },
    { name: 'Team', path: '/team', icon: FaUsers },
  ];

  return (
    <Box as="nav" bg="blue.600" py={3} boxShadow="sm" position="fixed" top={0} width="100%" zIndex={1000}>
      <Flex maxW="6xl" mx="auto" px={{ base: 4, md: 6 }} align="center">
        <Heading as="h1" size="md" color="white" _hover={{ color: 'blue.100' }} mr={6}>
          <ChakraLink as={RouterLink} to="/">
            BioSense Projects
          </ChakraLink>
        </Heading>
        <Spacer display={{ base: 'none', md: 'block' }} />
        {/* Desktop Menu */}
        <Flex display={{ base: 'none', md: 'flex' }} align="center">
          {links.map((link) => (
            <NavLink key={link.name} href={link.path} icon={link.icon}>
              {link.name}
            </NavLink>
          ))}
        </Flex>

        {/* Mobile Menu Icon */}
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          size="md"
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          ml="auto" // Push to the right on mobile
          colorScheme="blue" // Ensure icon is visible
        />
      </Flex>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="blue.600" color="white">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {links.map((link) => (
                <NavLink key={link.name} href={link.path} icon={link.icon}>
                  {link.name}
                </NavLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
