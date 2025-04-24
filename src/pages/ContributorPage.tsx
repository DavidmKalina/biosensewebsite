import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, Grid, Tabs, Tab } from '@mui/material';
import { useEffect } from 'react';
import { contributors, projects } from '../data/sampleData';
import ContributorBioTab from '../components/contributor/ContributorBioTab';
import ContributorResearchPapersTab from '../components/contributor/ContributorResearchPapersTab';
import ContributorProjects from '../components/contributor/ContributorProjects';

const CONTRIBUTOR_TABS = [
  { label: 'Bio', value: 'bio' },
  { label: 'Research Papers', value: 'papers' },
];

const ContributorPage = () => {
  const { id, tab } = useParams<{ id: string; tab?: string }>();
  const contributor = contributors.find(c => c.id === id);
  const navigate = useNavigate();
  const currentTab = tab || 'bio';

  useEffect(() => {
    // Redirect to /bio if no tab is specified
    if (!tab && contributor) {
      navigate(`/contributor/${contributor.id}/bio`, { replace: true });
    }
  }, [tab, contributor, navigate]);

  if (!contributor) {
    return (
      <Container>
        <Typography>Contributor not found</Typography>
      </Container>
    );
  }

  const contributorProjects = projects.filter(project => 
    project.contributors.includes(contributor.id)
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={contributor.imageUrl}
              alt={contributor.name}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {contributor.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {contributor.role}
          </Typography>
          <Tabs
            value={CONTRIBUTOR_TABS.findIndex(t => t.value === currentTab)}
            onChange={(_, idx) => navigate(`/contributor/${contributor.id}/${CONTRIBUTOR_TABS[idx].value}`)}
            sx={{ mb: 2 }}
          >
            {CONTRIBUTOR_TABS.map(tab => (
              <Tab key={tab.value} label={tab.label} />
            ))}
          </Tabs>
          {currentTab === 'bio' && <ContributorBioTab contributor={contributor} />}
          {currentTab === 'papers' && (
            <ContributorResearchPapersTab
              contributorApiId={contributor.contributorApiId}
            />
          )}
        </Grid>
      </Grid>
      <ContributorProjects projects={contributorProjects} />
    </Container>
  );
};

export default ContributorPage;
