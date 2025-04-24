import { useParams, useNavigate } from 'react-router-dom';
import { Container, Heading, Card, Image, Tabs, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { contributors, projects } from '../data/sampleData';
import ContributorBioTab from '../components/contributor/ContributorBioTab';
import ContributorResearchPapersTab from '../components/contributor/ContributorResearchPapersTab';
import ContributorProjects from '../components/contributor/ContributorProjects';

const ContributorPage = () => {
  const { id, tab } = useParams<{ id: string; tab?: string }>();
  const navigate = useNavigate();
  const contributor = contributors.find(c => c.id === id);

  useEffect(() => {
    if (!tab && contributor) {
      navigate(`/contributor/${contributor.id}/bio`, { replace: true });
    }
  }, [tab, contributor, navigate]);

  if (!contributor) {
    return (
      <Container maxW="lg" py={10}>
        <Heading size="md">Contributor not found</Heading>
      </Container>
    );
  }

  const contributorProjects = projects.filter(project =>
    project.contributors.includes(contributor.id)
  );

  const currentTab = tab || 'bio';

  return (
    <Container maxW="6xl" mx="auto" py={6}>
      <Card.Root mb={6} p={6} display="flex" flexDirection={{ base: 'column', md: 'row' }} alignItems="center">
        <Image src={contributor.imageUrl} alt={contributor.name} boxSize="120px" borderRadius="full" mr={{ md: 8 }} mb={{ base: 4, md: 0 }} />
        <Card.Body>
          <Card.Title>{contributor.name}</Card.Title>
          <Card.Description>{contributor.role}</Card.Description>
        </Card.Body>
      </Card.Root>
      <Tabs.Root value={currentTab} onValueChange={({value}) => {navigate(`/contributor/${contributor.id}/${value}`)}} colorScheme="blue" variant="enclosed">
        <Tabs.List mb={4}>
          <Tabs.Trigger key={'Bio'} value={'Bio'}>Bio</Tabs.Trigger>
          <Tabs.Trigger key={'papers'} value={'papers'}>Research Papers</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content px={0} value={'bio'}>
          <ContributorBioTab contributor={contributor} />
        </Tabs.Content>
        <Tabs.Content px={0} value={'papers'}>
          <ContributorResearchPapersTab contributorApiId={contributor.contributorApiId} />
        </Tabs.Content>
      </Tabs.Root>
      <Box mt={8}>
        <ContributorProjects projects={contributorProjects} />
      </Box>
    </Container>
  );
};

export default ContributorPage;
