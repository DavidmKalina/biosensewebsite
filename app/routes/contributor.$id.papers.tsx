import ContributorResearchPapersTab from "~/components/contributor/ContributorResearchPapersTab";
import { useParams } from "react-router-dom";
import { contributors } from "../data/sampleData";
import { Container, Heading } from "@chakra-ui/react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export async function loader({
  params,
}: LoaderFunctionArgs) {
  const contributor = contributors.find(c => c.id === params.id);
  return contributor;
}

export const meta: MetaFunction = ({ params }) => {
  const contributor = contributors.find(c => c.id === params.id);
  return [
    { title: `${contributor?.name} - Papers | BioSense`, },
    {
      property: "og:title",
      content: `${contributor?.name} - Papers | BioSense`,
    },
    {
      name: "description",
      content: `Overview of papers written by ${contributor?.name}.`,
    },
    { rel: 'preconnect', href: `https://api.semanticscholar.org`, crossOrigin: "anonymous" }
  ];
};

export default function Index() {
  const contributor = useLoaderData<typeof loader>();

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