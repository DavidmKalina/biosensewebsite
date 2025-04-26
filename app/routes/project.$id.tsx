import { Container, Heading } from "@chakra-ui/react";
import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { contributors, projects } from "~/data/sampleData";
import ProjectPage from "~/pages/ProjectPage";
import { Project } from "~/types";

export async function loader({
  params,
}: LoaderFunctionArgs) {
  const project = projects.find(c => c.id === params.id);
  const projectContributors = project ? contributors.filter(c => project.contributors.includes(c.id)) : [];
  return {project, projectContributors};
}

export const meta: MetaFunction<typeof loader> = ({ data: { project } = {} }) => {
  return [
    { title: `${project?.title} | BioSense`, },
    {
      property: "og:title",
      content: `${project?.title} - ${project?.shortDescription} | BioSense`,
    },
    {
      name: "description",
      content: `${project?.title} - ${project?.fullDescription}}`,
    },
  ];
};

export default function Index() {
    const {project, projectContributors} = useLoaderData<typeof loader>();
    if(!project) return (
      <Container maxW="lg" py={10}>
        <Heading size="md">Project not found</Heading>
      </Container>
    );
    return (
      <ProjectPage project={project} projectContributors={projectContributors} />
    );
  }