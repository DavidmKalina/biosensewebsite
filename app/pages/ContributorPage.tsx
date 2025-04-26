import { useParams, useNavigate, NavLink, Outlet } from 'react-router-dom';
import { Container, Heading, Card, Image, Box, Button, ButtonGroup } from '@chakra-ui/react';
import { useMemo } from 'react';
import ContributorProjects from '../components/contributor/ContributorProjects';
import { Contributor, Project } from '~/types';

const ContributorPage = ({ contributor, projects }: { contributor?: Contributor, projects: Project[] }) => {
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
          to={`/contributor/${contributor.id}/bio`}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Bio
        </NavLink></Button>
        <Button asChild variant="outline">
        <NavLink
          to={`/contributor/${contributor.id}/papers`}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Research Papers
        </NavLink></Button>
      </ButtonGroup>

      <Outlet />

      <Box mt={8}>
        <ContributorProjects projects={contributorProjects} />
      </Box>
    </Container>
  );
};

export default ContributorPage;
