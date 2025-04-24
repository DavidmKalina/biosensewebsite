import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import ProjectCarousel from '../components/ProjectCarousel';
import { projects, contributors } from '../data/sampleData';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Science Projects Showcase
      </Typography>
      
      <ProjectCarousel projects={projects} />

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
        Our Contributors
      </Typography>
      
      <Grid container spacing={3}>
        {contributors.map((contributor) => (
          <Grid item xs={12} sm={6} md={4} key={contributor.id}>
            <Card
              component={Link}
              to={`/contributor/${contributor.id}`}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none'
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={contributor.imageUrl}
                alt={contributor.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                  {contributor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {contributor.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
