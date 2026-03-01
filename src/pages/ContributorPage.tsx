import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Heading,
  Image,
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Tabs,
  Flex,
  Separator,
  SimpleGrid,
  Card,
  Avatar,
} from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { contributors, projects } from '../data/sampleData';
import ContributorResearchPapersTab from '../components/contributor/ContributorResearchPapersTab';
import { motion } from 'framer-motion';
import { LuUser, LuFileText, LuGraduationCap, LuArrowLeft, LuArrowRight } from 'react-icons/lu';

const MotionBox = motion(Box);
const MotionContainer = motion(Container);

const ContributorPage = () => {
  const { id, tab } = useParams<{ id: string; tab?: string }>();
  const navigate = useNavigate();
  const contributor = contributors.find(c => c.id === id);

  useEffect(() => {
    if (!tab && contributor) {
      navigate(`/contributor/${contributor.id}/bio`, { replace: true });
    }
  }, [tab, contributor?.id, navigate]);

  const contributorProjects = useMemo(() => projects.filter(project =>
    contributor?.id && project.contributors.includes(contributor.id)
  ), [projects.length, contributor?.id]);

  if (!contributor || contributor.role === 'External Collaborator') {
    return (
      <Container maxW="lg" py={20} textAlign="center">
        <Heading size="lg" color="fg.muted" mb={6}>Contributor not found</Heading>
        <Button onClick={() => navigate('/team')} variant="outline">
            <LuArrowLeft /> Back to Team
        </Button>
      </Container>
    );
  }

  const activeTab = tab || 'bio';
  const hasResearchPapers = false; // Boolean(contributor.contributorApiId);

  return (
    <Box bg="bg.subtle" minH="100vh" py={{ base: 8, md: 12 }} color="fg">
      <MotionContainer
        maxW="7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <Box
          bg="bg.panel"
          borderRadius="2xl"
          p={8}
          boxShadow="sm"
          borderWidth="1px"
          borderColor="border.subtle"
          mb={8}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            gap={8}
          >
            <Box
              flexShrink={0}
              borderRadius="full"
              overflow="hidden"
              borderWidth="4px"
              borderColor="bg.subtle"
              boxShadow="md"
            >
              <Avatar.Root boxSize={{ base: "150px", md: "200px" }}>
                <Avatar.Image src={contributor.imageUrl} objectFit="cover" />
                <Avatar.Fallback justifyContent="center" alignItems="center" display="flex" height="100%" width="100%">
                  <LuUser size="50%" />
                </Avatar.Fallback>
              </Avatar.Root>
            </Box>

            <VStack
              align={{ base: 'center', md: 'flex-start' }}
              gap={4}
              flex="1"
              textAlign={{ base: 'center', md: 'left' }}
            >
              <Heading size="3xl" fontWeight="bold" color="fg">
                {contributor.name}
              </Heading>
              <HStack color="fg.muted" fontSize="lg" fontWeight="medium">
                <LuGraduationCap />
                <Text>{contributor.role}</Text>
              </HStack>
            </VStack>
          </Flex>
        </Box>

        {/* Content */}
        {hasResearchPapers ? (
          <Tabs.Root
            value={activeTab}
            onValueChange={(e) => navigate(`/contributor/${contributor.id}/${e.value}`)}
            variant="line"
            size="lg"
            lazyMount
          >
            <Tabs.List mb={8} borderBottomWidth="1px" borderColor="border.subtle" w="full">
              <Tabs.Trigger value="bio" px={6} pb={3} color="fg.muted" _selected={{ color: "blue.600", borderColor: "blue.600", fontWeight: "semibold" }}>
                <LuUser /> Biography
              </Tabs.Trigger>
              <Tabs.Trigger value="papers" px={6} pb={3} color="fg.muted" _selected={{ color: "blue.600", borderColor: "blue.600", fontWeight: "semibold" }}>
                <LuFileText /> Research Papers
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="bio" color="fg">
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Text fontSize="lg" lineHeight="1.8" color="fg.muted" whiteSpace="pre-line">
                  {contributor.bio}
                </Text>
              </MotionBox>
            </Tabs.Content>

            <Tabs.Content value="papers" color="fg">
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ContributorResearchPapersTab contributorApiId={contributor.contributorApiId} />
              </MotionBox>
            </Tabs.Content>
          </Tabs.Root>
        ) : (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            bg="bg.panel"
            p={8}
            borderRadius="2xl"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="border.subtle"
          >
            <Heading size="xl" mb={6} letterSpacing="tight">Biography</Heading>
            <Text fontSize="lg" lineHeight="1.8" color="fg.muted" whiteSpace="pre-line">
              {contributor.bio}
            </Text>
          </MotionBox>
        )}

        {/* Projects Section */}
        {contributorProjects.length > 0 && (
          <MotionBox
            mt={16}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Separator mb={10} borderColor="border.muted" />
            <Heading size="2xl" mb={8} textAlign="center">Associated Projects</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              {contributorProjects.map((project) => (
                <Card.Root
                  key={project.id}
                  flexDirection={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  _hover={{ borderColor: 'blue.400', shadow: 'sm' }}
                  transition="all 0.2s"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={project.imageUrl}
                    alt={project.title}
                    aspectRatio={{ base: "2/1", sm: "1/1" }}
                  />
                  <Card.Body p={5}>
                    <Heading size="md" mb={2} lineClamp={1}>{project.title}</Heading>
                    <Text fontSize="sm" color="fg.muted" lineClamp={2} mb={4}>
                      {project.shortDescription}
                    </Text>
                    <Button asChild variant="ghost" size="sm" colorPalette="blue" p={0} _hover={{ bg: 'transparent', textDecoration: 'underline' }}>
                      <RouterLink to={`/project/${project.id}`}>
                        View Project <LuArrowRight />
                      </RouterLink>
                    </Button>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </MotionBox>
        )}

      </MotionContainer>
    </Box>
  );
};

export default ContributorPage;
