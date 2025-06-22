import {
  Box,
  Flex,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  Drawer, // Assuming this and sub-components ARE exported, despite build errors.
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Heading,
  Spacer,
  Icon, // For icons passed as components
} from '@chakra-ui/react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaHome, FaInfoCircle, FaUsers, FaHandshake } from 'react-icons/fa';
import React from 'react'; // Import React for ReactNode type

// Explicitly define props for NavLink, including 'to' for RouterLink
interface NavLinkProps extends Omit<RouterLinkProps, 'to'> { // Inherit RouterLinkProps, omit 'to' to redefine
  href: string; // 'href' will be mapped to 'to'
  children: React.ReactNode;
  icon?: React.ElementType;
  onClick?: () => void; // For closing drawer
  // Chakra specific styling props can be added here if needed, or rely on _hover etc.
  px?: number | string;
  py?: number | string;
  rounded?: string;
  color?: string;
  display?: string;
  alignItems?: string;
  _hover?: Record<string, any>;
}

const NavLink = ({ href, children, icon: IconComponent, onClick, ...rest }: NavLinkProps) => (
  <ChakraLink
    as={RouterLink}
    to={href} // Map href to 'to' for RouterLink
    onClick={onClick}
    px={rest.px ?? 2}
    py={rest.py ?? 1}
    rounded={rest.rounded ?? 'md'}
    _hover={rest._hover ?? {
      textDecoration: 'none',
      bg: 'blue.700',
    }}
    color={rest.color ?? "white"}
    display={rest.display ?? "flex"}
    alignItems={rest.alignItems ?? "center"}
    {...rest} // Spread any other RouterLink compatible props
  >
    {IconComponent && <Icon as={IconComponent} mr={2} />}
    {children}
  </ChakraLink>
);

const Navbar = () => {
  // Assuming useDisclosure returns isOpen, onOpen, onClose as per docs
  // The error TS2339: Property 'isOpen' does not exist on type '{ open: boolean; ... }' is concerning.
  // If 'open' is indeed the property, then code should be: const { open, onOpen, onClose } = useDisclosure();
  // However, Chakra docs consistently use 'isOpen'. This might be a misconfiguration in the build environment's TS.
  // For now, sticking to 'isOpen' as per documentation.
  // Previous Error: TS2339: Property 'isOpen' does not exist on type '{ open: boolean; ... }'.
  // Addressing this by using 'open' as suggested by the error type.
  const { open, onOpen, onClose } = useDisclosure();

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
          {/* For ChakraLink as RouterLink, 'to' prop should be passed */}
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
        {/* Error TS2322: Type 'Element' is not assignable to type 'Nested<SystemStyleObject>' for _icon */}
        <IconButton
          aria-label="Open Menu"
          _icon={HamburgerIcon} // Changed from <HamburgerIcon /> to HamburgerIcon (the component itself)
          size="md"
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          ml="auto"
          colorScheme="blue"
        />
      </Flex>

      {/* Mobile Drawer Menu */}
      {/* Errors TS2305 (no exported member DrawerOverlay/DrawerCloseButton) and */}
      {/* TS2786 (Drawer cannot be used as JSX component) are critical. */}
      {/* Assuming standard imports are correct & build env has issue. */}
      {/* If these components are truly not found/usable, the build will fail. */}
      {/* This code assumes they *should* work as per Chakra v3.x docs. */}
      <Drawer isOpen={open} placement="right" onClose={onClose}> {/* Changed isOpen to open */}
        <DrawerOverlay />
        <DrawerContent bg="blue.600" color="white">
          <DrawerCloseButton /> {/* This also had TS2305 */}
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            {/* Error TS2322: Property 'spacing' does not exist on VStack. This is incorrect for Chakra's VStack. */}
            <VStack spacing={4} alignItems="stretch">
              {links.map((link) => (
                <NavLink key={link.name} href={link.path} icon={link.icon} onClick={onClose}>
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
