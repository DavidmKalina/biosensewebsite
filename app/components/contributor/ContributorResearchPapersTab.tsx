import { Box, Spinner } from '@chakra-ui/react';
import type { ResearchPaper } from '../../types';
import { lazy, Suspense } from 'react';

const ResearchPapersTable = lazy(() => import('./ResearchPapersTable.js'));

interface ContributorResearchPapersTabProps {
  contributorApiId?: string;
  researchPapers?: ResearchPaper[];
}

const ContributorResearchPapersTab: React.FC<ContributorResearchPapersTabProps> = ({ contributorApiId }) => (
  <Box>
    <Suspense fallback={<Spinner size="lg" />}> 
      <ResearchPapersTable contributorApiId={contributorApiId} />
    </Suspense>
  </Box>
);

export default ContributorResearchPapersTab;
