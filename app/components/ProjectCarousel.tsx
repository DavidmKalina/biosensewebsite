import { Box, Heading, Image, useBreakpointValue, Card } from '@chakra-ui/react';
import * as Slider2 from "@ant-design/react-slick";
import type { Project } from '../types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = Slider2.default.default ??  Slider2.default;

interface ProjectCarouselProps {
  projects: Project[];
}

function CustomSlide(props: {
  id: string;
} & Project) {
  const { id, imageUrl, title, shortDescription, ...otherProps } = props;
  return (
    <Card.Root key={id} width="100%" {...otherProps}>
      <Image
        src={imageUrl}
        alt={title}
        fit="cover"
        maxW="100%"
      />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Card.Description>
          {shortDescription}
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
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
  return (
    <Box py={8} px={{ base: 2, md: 8 }}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Featured Projects
      </Heading>
      <Box maxW={"100vw"} overflow={"hidden"} mx="-6">
        <Slider {...settings}>
          {projects.map((project) => (
            <CustomSlide {...project} key={project.id} />
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default ProjectCarousel;
