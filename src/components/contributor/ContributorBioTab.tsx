import { Box, Text, Spinner } from '@chakra-ui/react';
import type { Contributor } from '../../types';
import { useQuery } from '@tanstack/react-query';

interface ContributorBioTabProps {
  contributor: Contributor;
}

const fetchBio = async ({ queryKey }: { queryKey: [string, string | undefined] }) => {
    const [, contributorApiId] = queryKey;
    if (!contributorApiId) return {};
    const res = await fetch(`https://api.semanticscholar.org/graph/v1/author/${contributorApiId}?fields=url,citationCount,paperCount`)
    const data = await res.json()
    return {
      url: data.url,
      citationCount: data.citationCount,
      paperCount: data.paperCount,
    }
}

const ContributorBioTab: React.FC<ContributorBioTabProps> = ({ contributor }) => {
  
  const {
    isLoading: loading,
    error,
    data: scholarBio,
  } = useQuery({
    queryKey: ['bio', contributor.contributorApiId], queryFn: fetchBio,
  })

  return (
    <Box>
      <Text mb={4}>{contributor.bio}</Text>
      {contributor.contributorApiId && (
        <Box mt={4}>
          {loading && <Spinner size="sm" ml={2} />}
          {error && <Text color="red.500">{`${error}`}</Text>}
          {scholarBio && (
            <Box>
              <Text>Citation Count: {scholarBio.citationCount ?? '-'}</Text>
              <Text>Paper Count: {scholarBio.paperCount ?? '-'}</Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ContributorBioTab;
