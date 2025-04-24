import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, Grid, Box } from '@mui/material';
import { contributors, projects } from '../data/sampleData';

const ContributorPage = () => {
  const { id } = useParams<{ id: string }>();
  const contributor = contributors.find(c => c.id === id);
  
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
          <Typography variant="body1" paragraph>
            {contributor.bio}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Projects Involved
        </Typography>
        <Grid container spacing={3}>
          {contributorProjects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <Card
                component={Link}
                to={`/project/${project.id}`}
                sx={{
                  display: 'flex',
                  height: '100%',
                  textDecoration: 'none',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 200 }}
                  image={project.imageUrl}
                  alt={project.title}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.shortDescription}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ContributorPage;
