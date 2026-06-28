import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  IconButton,
  useDisclosure,
  Drawer,
  VStack,
  Container,
  Text,
  Popover, // Use Popover for the mega menu
  Button,
  Portal,
  SimpleGrid,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu, HiChevronDown, HiX } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import { useProjects, useCategories } from '../hooks/useContent';

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
      _currentPage={{ fontWeight: 'bold', color: 'blue.700' }}
    >
      <NavLink
        to={to}
        onClick={onClick}
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
  const projects = useProjects();
  const categories = useCategories();
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
                  Research Categories
                </Text>
              </Box>

              <SimpleGrid columns={3} gap={2} p={4}>
                {categories.map((category) => {
                  const categoryProjects = projects.filter((p) => p.categoryId === category.id);
                  return (
                    <VStack key={category.id} align="stretch" gap={1}>
                      <Link asChild _hover={{ textDecoration: 'none' }}>
                        <NavLink to={`/projects/${category.id}`}>
                          <Text
                            fontWeight="bold"
                            fontSize="sm"
                            color="blue.700"
                            px={3}
                            py={2}
                            borderRadius="lg"
                            _hover={{ bg: 'blue.50' }}
                            transition="all 0.2s ease-in-out"
                          >
                            {category.title}
                          </Text>
                        </NavLink>
                      </Link>

                      {categoryProjects.length === 0 ? (
                        <Text fontSize="xs" color="gray.400" fontStyle="italic" px={3} py={1}>
                          Coming soon
                        </Text>
                      ) : (
                        categoryProjects.map((project) => (
                          <Link
                            asChild
                            key={project.id}
                            _hover={{ textDecoration: 'none' }}
                          >
                            <NavLink to={`/project/${project.id}`}>
                              <Text
                                fontSize="xs"
                                color="gray.600"
                                lineHeight="1.4"
                                px={3}
                                py={1.5}
                                borderRadius="lg"
                                _hover={{ bg: 'blue.50', color: 'blue.700' }}
                                transition="all 0.2s ease-in-out"
                              >
                                {project.title}
                              </Text>
                            </NavLink>
                          </Link>
                        ))
                      )}
                    </VStack>
                  );
                })}
              </SimpleGrid>

              <Box p={3} bg="gray.50" borderTopWidth="1px" borderColor="gray.100" textAlign="center">
                <Button asChild variant="ghost" size="sm" colorPalette="blue" _hover={{ bg: 'blue.100' }}>
                  <NavLink to="/projects">View All Projects</NavLink>
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
  const categories = useCategories();

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
              <HStack gap={2.5}>
                <Image
                  src="/images/biosis-logo-mark.png"
                  alt=""
                  aria-hidden="true"
                  h={{ base: '32px', md: '40px' }}
                  w="auto"
                />
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
            bg="transparent"
            color="gray.800"
            _hover={{ bg: 'gray.100', color: 'blue.600' }}
            _active={{ bg: 'gray.200' }}
            _dark={{ color: 'gray.800', bg: 'transparent' }}
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
          <Drawer.Content bg="white" _dark={{ bg: 'white' }}>
            <Drawer.CloseTrigger asChild>
                <IconButton
                    variant="ghost"
                    size="sm"
                    position="absolute"
                    top="4"
                    right="4"
                    bg="transparent"
                    color="gray.800"
                    _hover={{ bg: 'gray.100', color: 'blue.600' }}
                    _active={{ bg: 'gray.200' }}
                    _dark={{ color: 'gray.800', bg: 'transparent' }}
                    aria-label="Close navigation menu"
                >
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
                        <Button asChild variant="ghost" justifyContent="flex-start" size="lg" color="gray.800" _hover={{ bg: 'gray.100', color: 'blue.600' }}>
                            <NavLink to="/" onClick={onClose}>Home</NavLink>
                        </Button>
                        {navLinks.map((link) => (
                        <Button key={link.label} asChild variant="ghost" justifyContent="flex-start" size="lg" color="gray.800" _hover={{ bg: 'gray.100', color: 'blue.600' }}>
                            <NavLink to={link.path} onClick={onClose}>
                                {link.label}
                            </NavLink>
                        </Button>
                        ))}
                    </VStack>
                </Box>
                
                {/* Projects section for mobile, grouped by category */}
                <Box p={4} borderTopWidth="1px" borderColor="gray.100">
                  <Text fontWeight="bold" color="gray.500" mb={2} fontSize="xs" textTransform="uppercase">
                    Research Categories
                  </Text>
                  <VStack align="stretch" gap={1}>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        asChild
                        _hover={{ textDecoration: 'none', bg: 'gray.50' }}
                        borderRadius="md"
                        p={2}
                        display="block"
                      >
                        <NavLink to={`/projects/${category.id}`} onClick={onClose}>
                          <Text fontWeight="bold" fontSize="sm" color="blue.700">
                            {category.title}
                          </Text>
                        </NavLink>
                      </Link>
                    ))}
                  </VStack>
                  <Button asChild variant="outline" colorPalette="blue" size="sm" width="full" mt={3}>
                    <NavLink to="/projects" onClick={onClose}>View All Projects</NavLink>
                  </Button>
                </Box>
                
                <Box p={4} mt="auto">
                    <Button
                        asChild
                        width="full"
                        colorPalette="blue"
                        variant="solid"
                        size="lg"
                        color="white"
                        _hover={{ bg: 'blue.600', color: 'white' }}
                    >
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