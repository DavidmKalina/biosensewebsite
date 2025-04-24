import { Box } from '@mui/material';
import type { ResearchPaper } from '../../types';
import ResearchPapersTable from './ResearchPapersTable';

interface ContributorResearchPapersTabProps {
  contributorApiId?: string;
  researchPapers?: ResearchPaper[];
}

const ContributorResearchPapersTab: React.FC<ContributorResearchPapersTabProps> = ({ contributorApiId, researchPapers }) => (
  <Box>
    <ResearchPapersTable contributorApiId={contributorApiId} localPapers={researchPapers} />
  </Box>
);

export default ContributorResearchPapersTab;
