import React from 'react';
import { Box, Grid, Image, Text, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { contributors } from '../data/sampleData';

const Team: React.FC = () => {
  return (
    <Box style={{ padding: '20px', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column'}}>
      <Heading as="h2" size="lg" textAlign="center" mb={4}>
        Meet Our Team
      </Heading>
      <Text mb={8} textAlign="center">
        Our team consists of passionate individuals dedicated to advancing our mission and making a difference.
      </Text>
      <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        {contributors.map(({ id, name, role, imageUrl }) => (
          <RouterLink to={`/contributor/${id}/bio`} key={id} style={{ textDecoration: 'none' }}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" _hover={{ boxShadow: 'lg' }}>
              <Image src={imageUrl} alt={name} height="200px" width="100%" objectFit="cover" />
              <Box p="6">
                <Text fontWeight="bold" fontSize="xl" mb={2}>{name}</Text>
                <Text color="gray.600">{role}</Text>
              </Box>
            </Box>
          </RouterLink>
        ))}
      </Grid>
    </Box>
  );
};

export default Team;
