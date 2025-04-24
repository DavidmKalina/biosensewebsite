import { useEffect } from 'react';
import Slider from 'react-slick';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProjectCarouselProps {
  projects: Project[];
}

const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: '2rem auto' }}>
      <Slider {...settings}>
        {projects.map((project) => (
          <Box key={project.id} sx={{ p: 2 }}>
            <Card
              component={Link}
              to={`/project/${project.id}`}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                textDecoration: 'none',
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: '100%', md: '50%' },
                  height: { xs: 200, md: 400 },
                  objectFit: 'cover',
                }}
                image={project.imageUrl}
                alt={project.title}
              />
              <CardContent sx={{ flex: 1, bgcolor: 'background.paper' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {project.shortDescription}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProjectCarousel;
