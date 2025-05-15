import { Box, Heading, Image, useBreakpointValue, Card } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import type { Project } from '../types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

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
    arrows: true,
    nextArrow: <NextArrow />, prevArrow: <PrevArrow />,
  };
  return (
    <Box py={8} px={{ base: 2, md: 8 }}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Featured Projects
      </Heading>
      <Box maxW={"100vw"} overflow={"hidden"} mx="-6">
        <Slider {...settings}>
          {projects.map((project) => (
            <RouterLink to={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
                <CustomSlide {...project} />
              </RouterLink>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

const arrowStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '50px',
  height: '50px',
  background: 'rgba(0,0,0,0.5)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 2,
};

function Arrow({ onClick, direction }: { onClick: () => void; direction: 'left' | 'right' }) {
  return (
    <div
      style={{
        ...arrowStyle,
        [direction]: '10px',
      }}
      onClick={onClick}
    >
      {direction === 'right' ? <FaChevronRight size={24} color="#fff" /> : <FaChevronLeft size={24} color="#fff" />}
    </div>
  );
}

function NextArrow({ onClick }: any) {
  return <Arrow onClick={onClick} direction="right" />;
}

function PrevArrow({ onClick }: any) {
  return <Arrow onClick={onClick} direction="left" />;
}

export default ProjectCarousel;
