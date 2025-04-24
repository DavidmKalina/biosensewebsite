import { Typography, Box, CircularProgress } from '@mui/material';
import type { Contributor } from '../../types';
import { useQuery } from '@tanstack/react-query';

interface ContributorBioTabProps {
  contributor: Contributor;
}


const fetchBio = async ({ queryKey: [_, contributorApiId] }: { queryKey: [unknown, string | undefined] }) => {
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
      <Typography variant="body1" paragraph>
        {contributor.bio}
      </Typography>
      {contributor.contributorApiId && (
        <Box sx={{ mt: 2 }}>
          {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
          {error && <Typography color="error">{`${error}`}</Typography>}
          {scholarBio && (
            <Box>
              <Typography>Citation Count: {scholarBio.citationCount ?? '-'}</Typography>
              <Typography>Paper Count: {scholarBio.paperCount ?? '-'}</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ContributorBioTab;
