import { Box, CircularProgress } from '@mui/material';
import type { ResearchPaper } from '../../types';
import { lazy, Suspense } from 'react';

const ResearchPapersTable = lazy(() => import('./ResearchPapersTable.js'));

interface ContributorResearchPapersTabProps {
  contributorApiId?: string;
  researchPapers?: ResearchPaper[];
}

const ContributorResearchPapersTab: React.FC<ContributorResearchPapersTabProps> = ({ contributorApiId }) => (
  <Box>
    <Suspense fallback={<CircularProgress size={24} />}>
      <ResearchPapersTable contributorApiId={contributorApiId} />
    </Suspense>
  </Box>
);

export default ContributorResearchPapersTab;
