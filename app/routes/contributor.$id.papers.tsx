import ContributorResearchPapersTab from "~/components/contributor/ContributorResearchPapersTab";
import { useParams } from "react-router-dom";
import { contributors } from "../data/sampleData";
import { Container, Heading } from "@chakra-ui/react";

export default function Index() {
  const { id } = useParams<{ id: string }>();
  const contributor = contributors.find(c => c.id === id);

  if (!contributor) {
    return (
      <Container maxW="lg" py={10}>
        <Heading size="md">Contributor not found</Heading>
      </Container>
    );
  }

  return (
    <ContributorResearchPapersTab contributorApiId={contributor.contributorApiId} />
  );
}