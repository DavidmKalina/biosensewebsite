import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { Container, Heading, Card, Image, Box, Button, ButtonGroup } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
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
  }, [tab, contributor?.id, navigate]);

  const contributorProjects = useMemo(() => projects.filter(project =>
    contributor?.id && project.contributors.includes(contributor.id)
  ), [projects.length, contributor?.id]);

  if (!contributor) {
    return (
      <Container maxW="lg" py={10}>
        <Heading size="md">Contributor not found</Heading>
      </Container>
    );
  }

  return (
    <Container maxW="6xl" mx="auto" py={6}>
      <Card.Root mb={6} p={6} display="flex" flexDirection={{ base: 'column', md: 'row' }} alignItems="center">
        <Image src={contributor.imageUrl} alt={contributor.name} boxSize="120px" borderRadius="full" mr={{ md: 8 }} mb={{ base: 4, md: 0 }} />
        <Card.Body>
          <Card.Title>{contributor.name}</Card.Title>
          <Card.Description>{contributor.role}</Card.Description>
        </Card.Body>
      </Card.Root>
      <ButtonGroup size="sm" variant="outline" attached>
        <Button asChild variant="outline"><NavLink
          to={`/contributor/${id}/bio`}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Bio
        </NavLink></Button>
        <Button asChild variant="outline">
        <NavLink
          to={`/contributor/${id}/papers`}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Research Papers
        </NavLink></Button>
      </ButtonGroup>

      {tab === "bio" && <ContributorBioTab contributor={contributor} />}
      {tab === "papers" && <ContributorResearchPapersTab contributorApiId={contributor.contributorApiId} />}

      <Box mt={8}>
        <ContributorProjects projects={contributorProjects} />
      </Box>
    </Container>
  );
};

export default ContributorPage;
