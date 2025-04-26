import ContributorBioTab from "~/components/contributor/ContributorBioTab";
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

export const meta: MetaFunction<typeof loader> = ({ data: contributor }) => {
  return [
    { title: `${contributor?.name} - Bio | BioSense`, },
    {
      property: "og:title",
      content: `${contributor?.name} - Bio | BioSense`,
    },
    {
      name: "description",
      content: `Bio of ${contributor?.name}.`,
    },
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
    <ContributorBioTab contributor={contributor} />
  );
}