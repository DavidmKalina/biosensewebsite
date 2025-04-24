import { Box, Heading, Text, Image, useBreakpointValue, Card } from '@chakra-ui/react';
import Slider from 'react-slick';
import type { Project } from '../types';

interface ProjectCarouselProps {
  projects: Project[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const slidesToShow = useBreakpointValue({ base: 1, md: 1, lg: 1 }) ?? 1;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };
  const project = projects[0 ]
  return (
    <Box py={8} px={{ base: 2, md: 8 }}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Featured Projects
      </Heading>
      <Card.Root maxW="sm" overflow="hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
        />
        <Card.Body gap="2">
          <Card.Title>{project.title}</Card.Title>
          <Card.Description>
            {project.shortDescription}
          </Card.Description>
        </Card.Body>
      </Card.Root>

      <Slider {...settings}>
        {projects.map((project) => (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            bg="white"
            maxW="sm"
            w="100vw"
            mb={4}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              objectFit="cover"
              w="100%"
              h={{ base: '160px', md: '200px' }}
            />
            <Box p={4}>
              <Heading as="h3" size="md" mb={2}>
                {project.title}
              </Heading>
              <Text color="gray.600">{project.shortDescription}</Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProjectCarousel;
