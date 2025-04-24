import { Box, Typography, Grid, Card, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface ContributorProjectsProps {
  projects: Project[];
}

const ContributorProjects: React.FC<ContributorProjectsProps> = ({ projects }) => (
  <Box sx={{ mt: 6 }}>
    <Typography variant="h4" gutterBottom>
      Projects Involved
    </Typography>
    <Grid container spacing={3}>
      {projects.map((project) => (
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
);

export default ContributorProjects;
