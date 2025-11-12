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
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu, HiChevronDown } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import { projects } from '../data/sampleData';

// Updated navLinks, "Home" is covered by the brand, "Projects" is a separate menu
const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Team', path: '/team' },
  { label: 'Get Involved', path: '/get-involved' },
];

/**
 * Reusable component for navigation links
 */
const NavLinkItem = ({ to, children, onClick }: { to: string, children: React.ReactNode, onClick?: () => void }) => {
  return (
    <Link
      asChild
      _hover={{
        textDecoration: 'none',
        color: 'blue.500',
      }}
      fontSize="md"
      fontWeight="medium"
    >
      <NavLink
        to={to}
        onClick={onClick}
        style={({ isActive }) => ({
          fontWeight: isActive ? 'bold' : 'normal',
          color: isActive ? '#2196f3' : 'inherit',
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
    <Popover.Root>
      <Popover.Trigger asChild>
        <Flex
          as="button"
          align="center"
          gap={1}
          _hover={{ color: 'blue.500' }}
          fontSize="md"
          fontWeight="medium"
          color="gray.700"
        >
          Projects
          <HiChevronDown size="16px" />
        </Flex>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content width={{ base: 'sm', md: 'md', lg: 'lg' }} boxShadow="lg">
          <Popover.Arrow />
          <Popover.Body p={4}>
            <VStack gap={2} align="start">
              {projects.map((project) => (
                <Link
                  asChild
                  key={project.id}
                  _hover={{ textDecoration: 'none', bg: 'gray.100' }}
                  display="block"
                  borderRadius="md"
                  p={3}
                  width="100%"
                >
                  <NavLink to={`/project/${project.id}`}>
                    <HStack gap={4} align="start">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <VStack align="start" gap={0}>
                        <Text fontWeight="bold">{project.title}</Text>
                        <Text fontSize="sm" color="gray.600" lineClamp={2}>
                          {project.shortDescription}
                        </Text>
                      </VStack>
                    </HStack>
                  </NavLink>
                </Link>
              ))}
            </VStack>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

/**
 * The main Navbar component
 */
const Navbar = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
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
      zIndex="overlay"
      transition="all 0.2s ease-in-out"
      bg={isScrolled ? 'whiteAlpha.800' : 'transparent'}
      backdropFilter={isScrolled ? 'blur(10px)' : 'none'}
      boxShadow={isScrolled ? 'sm' : 'none'}
    >
      <Container maxW="6xl" py={3}>
        <Flex align="center" justify="space-between">
          {/* Brand/Logo */}
          <Link asChild _hover={{ textDecoration: 'none' }}>
            <NavLink to="/">
              <Text fontSize="xl" fontWeight="bold" color="blue.700">
                BioSIS Lab
              </Text>
            </NavLink>
          </Link>

          {/* Desktop Navigation */}
          <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <NavLinkItem key={link.label} to={link.path}>
                {link.label}
              </NavLinkItem>
            ))}
            <ProjectMegaMenu />
          </HStack>

          {/* Mobile Menu Icon */}
          <IconButton
            ref={btnRef}
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
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
        onOpenChange={({ open: newOpenState }) => {
          if (!newOpenState) onClose();
        }}
        finalFocusEl={() => btnRef.current}
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger mt={3} mr={3} />
            <Drawer.Body>
              <VStack as="nav" gap={8} align="start" mt={16}>
                {navLinks.map((link) => (
                  <NavLinkItem key={link.label} to={link.path} onClick={onClose}>
                    {link.label}
                  </NavLinkItem>
                ))}
                
                {/* Projects section for mobile */}
                <Box w="100%" pt={4} borderTopWidth="1px" borderColor="gray.200">
                  <Text fontWeight="bold" color="gray.500" mb={4}>
                    Projects
                  </Text>
                  <VStack align="start" gap={4} pl={4}>
                    {projects.map((project) => (
                      <NavLinkItem
                        key={project.id}
                        to={`/project/${project.id}`}
                        onClick={onClose}
                      >
                        {project.title}
                      </NavLinkItem>
                    ))}
                  </VStack>
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