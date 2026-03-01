import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Drawer,
  VStack,
  Container,
  Text,
  Popover, // Use Popover for the mega menu
  Image,
  Button,
  Portal,
  SimpleGrid,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu, HiChevronDown, HiX } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import { projects } from '../data/sampleData';

// Updated navLinks, "Home" is covered by the brand, "Projects" is a separate menu
const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Team', path: '/team' },
  { label: 'Publications', path: '/publications' },
];

/**
 * Reusable component for navigation links
 */
const NavLinkItem = ({ 
  to, 
  children, 
  onClick,
}: { 
  to: string, 
  children: React.ReactNode, 
  onClick?: () => void,
}) => {
  return (
    <Link
      asChild
      _hover={{
        textDecoration: 'none',
        color: 'blue.600',
      }}
      fontSize="md"
      fontWeight="medium"
      fontFamily="heading"
      color="gray.900"
      _dark={{ color: "gray.900" }} // Force dark text since navbar bg is white
      transition="color 0.2s"
      _focus={{ outline: 'none', boxShadow: 'none' }}
      _focusVisible={{ outline: 'none', boxShadow: 'none' }}
    >
      <NavLink
        to={to}
        onClick={onClick}
        style={({ isActive }) => ({
          fontWeight: isActive ? 'bold' : 'medium',
          color: isActive ? 'var(--chakra-colors-blue-700)' : undefined,
        })}
      >
        {children}
      </NavLink>
    </Link>
  );
};

/**
 * Desktop dropdown "Mega Menu" for Projects
 */
const ProjectMegaMenu = () => {
  return (
    <Popover.Root positioning={{ placement: "bottom-start" }}>
      <Popover.Trigger asChild>
        <Button
          variant="plain"
          color="gray.900"
          _dark={{ color: "gray.900" }}
          bg="transparent"
          _hover={{ color: 'blue.600', bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          _open={{ bg: 'transparent', color: 'blue.600' }}
          fontSize="md"
          fontWeight="medium"
          fontFamily="heading"
          _focus={{ outline: 'none', boxShadow: 'none' }}
          _focusVisible={{ outline: 'none', boxShadow: 'none' }}
          outline="none"
          focusRing="none"
          border="none"
          px={3}
          gap={1}
        >
          Projects <HiChevronDown />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content 
            width="640px" 
            boxShadow="2xl" 
            borderRadius="2xl" 
            _focus={{ outline: 'none' }} 
            bg="white"
            border="none"
            overflow="hidden"
          >
            <Popover.Arrow bg="gray.50" />
            <Popover.Body p={0}>
              <Box bg="gray.50" p={5} borderBottomWidth="1px" borderColor="gray.100">
                <Text fontWeight="bold" color="gray.700" fontSize="sm" textTransform="uppercase" letterSpacing="wider">
                  Research Projects
                </Text>
              </Box>

              <SimpleGrid columns={2} gap={2} p={4}>
                {projects.map((project) => (
                  <Link
                    asChild
                    key={project.id}
                    _hover={{ textDecoration: 'none' }}
                  >
                    <NavLink to={`/project/${project.id}`}>
                      <HStack 
                        gap={4} 
                        align="start" 
                        p={3} 
                        borderRadius="xl" 
                        _hover={{ bg: 'blue.50' }} 
                        transition="all 0.2s ease-in-out"
                      >
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        boxSize="56px"
                        objectFit="cover"
                        borderRadius="lg"
                        shadow="sm"
                      />
                      <VStack align="start" gap={1}>
                        <Text fontWeight="bold" fontSize="sm" color="gray.800" lineClamp={1}>
                          {project.title}
                        </Text>
                        <Text fontSize="xs" color="gray.500" lineClamp={2} lineHeight="1.4">
                          {project.shortDescription}
                        </Text>
                      </VStack>
                    </HStack>
                  </NavLink>
                </Link>
              ))}
              </SimpleGrid>
              
              <Box p={3} bg="gray.50" borderTopWidth="1px" borderColor="gray.100" textAlign="center">
                <Button asChild variant="ghost" size="sm" colorPalette="blue" _hover={{ bg: 'blue.100' }}>
                  <NavLink to="/about">View Research Areas</NavLink>
                </Button>
              </Box>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

/**
 * The main Navbar component
 */
const Navbar = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    // Check initial scroll
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      w="100%"
      zIndex="sticky"
      transition="all 0.2s ease-in-out"
      bg="rgba(255, 255, 255, 0.95)"
      backdropFilter="blur(12px)"
      boxShadow={isScrolled ? 'sm' : 'none'}
      borderBottomWidth={isScrolled ? '1px' : '0'}
      borderColor="gray.100"
      _dark={{ borderColor: "gray.200" }}
    >
      <Container maxW="7xl" py={3}>
        <Flex align="center" justify="space-between">
          {/* Brand/Logo */}
          <Link 
            asChild 
            _hover={{ textDecoration: 'none' }}
            _focus={{ outline: 'none', boxShadow: 'none' }}
            _focusVisible={{ outline: 'none', boxShadow: 'none' }}
            outline="none"
          >
            <NavLink to="/">
              <HStack gap={2}>
                <Text fontSize="2xl" fontWeight="bold" color="blue.700" letterSpacing="tight" fontFamily="heading">
                  BioSIS Lab
                </Text>
              </HStack>
            </NavLink>
          </Link>

          {/* Desktop Navigation */}
          <HStack gap={6} display={{ base: 'none', md: 'flex' }}>
            <ProjectMegaMenu />
            {navLinks.map((link) => (
              <NavLinkItem 
                key={link.label} 
                to={link.path} 
              >
                {link.label}
              </NavLinkItem>
            ))}
            <Button 
              asChild 
              size="sm" 
              colorPalette="blue" 
              variant="solid"
              fontFamily="heading"
              color="white"
              _hover={{
                 transform: "translateY(-1px)",
                 bg: "blue.600"
              }}
              _focus={{ outline: 'none', boxShadow: 'none' }}
              _focusVisible={{ outline: 'none', boxShadow: 'none' }}
              rounded="full"
              px={6}
            >
              <NavLink to="/contact">Contact Us</NavLink>
            </Button>
          </HStack>

          {/* Mobile Menu Icon */}
          <IconButton
            ref={btnRef}
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
            color="gray.900"
            _dark={{ color: "gray.900" }}
            _focus={{ outline: 'none', boxShadow: 'none' }}
            _focusVisible={{ outline: 'none', boxShadow: 'none' }}
            aria-label="Open navigation menu"
          >
            <HiOutlineMenu size="24px" />
          </IconButton>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer.Root
        open={open}
        placement="end"
        onOpenChange={(e) => {
          if (!e.open) onClose();
        }}
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger asChild>
                <IconButton variant="ghost" size="sm" position="absolute" top="4" right="4">
                    <HiX />
                </IconButton>
            </Drawer.CloseTrigger>
            <Drawer.Header borderBottomWidth="1px">
                <Drawer.Title>Menu</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body p={0}>
              <VStack as="nav" gap={0} align="stretch">
                <Box p={4}>
                    <Text fontWeight="bold" color="gray.500" mb={2} fontSize="xs" textTransform="uppercase">
                        Navigation
                    </Text>
                    <VStack align="stretch" gap={1}>
                        <Button asChild variant="ghost" justifyContent="flex-start" size="lg">
                            <NavLink to="/" onClick={onClose}>Home</NavLink>
                        </Button>
                        {navLinks.map((link) => (
                        <Button key={link.label} asChild variant="ghost" justifyContent="flex-start" size="lg">
                            <NavLink to={link.path} onClick={onClose}>
                                {link.label}
                            </NavLink>
                        </Button>
                        ))}
                    </VStack>
                </Box>
                
                {/* Projects section for mobile */}
                <Box p={4} borderTopWidth="1px" borderColor="gray.100">
                  <Text fontWeight="bold" color="gray.500" mb={2} fontSize="xs" textTransform="uppercase">
                    Research Projects
                  </Text>
                  <VStack align="stretch" gap={2}>
                    {projects.map((project) => (
                      <Link
                        asChild
                        key={project.id}
                        _hover={{ textDecoration: 'none', bg: 'gray.50' }}
                        borderRadius="md"
                        p={2}
                      >
                        <NavLink to={`/project/${project.id}`} onClick={onClose}>
                            <Text fontWeight="medium" fontSize="sm" color="gray.700">
                                {project.title}
                            </Text>
                        </NavLink>
                      </Link>
                    ))}
                  </VStack>
                </Box>
                
                <Box p={4} mt="auto">
                    <Button asChild width="full" colorPalette="blue" size="lg">
                        <NavLink to="/contact" onClick={onClose}>Contact Us</NavLink>
                    </Button>
                </Box>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
};

export default Navbar;