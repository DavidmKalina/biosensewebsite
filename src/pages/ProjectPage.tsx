import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, Grid, Box, Chip } from '@mui/material';
import { projects, contributors } from '../data/sampleData';

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return (
      <Container>
        <Typography>Project not found</Typography>
      </Container>
    );
  }

  const projectContributors = contributors.filter(c => 
    project.contributors.includes(c.id)
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {project.title}
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          height="400"
          image={project.imageUrl}
          alt={project.title}
          sx={{ objectFit: 'cover' }}
        />
      </Card>

      <Typography variant="body1" paragraph>
        {project.fullDescription}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Contributors
        </Typography>
        <Grid container spacing={3}>
          {projectContributors.map((contributor) => (
            <Grid item xs={12} sm={6} md={4} key={contributor.id}>
              <Card
                component={Link}
                to={`/contributor/${contributor.id}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  p: 2,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    mr: 2,
                  }}
                  image={contributor.imageUrl}
                  alt={contributor.name}
                />
                <Box>
                  <Typography variant="h6" component="div">
                    {contributor.name}
                  </Typography>
                  <Chip label={contributor.role} size="small" />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProjectPage;
