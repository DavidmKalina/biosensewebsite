import { LoaderFunctionArgs, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { contributors, projects } from "~/data/sampleData";
import ContributorPage from "~/pages/ContributorPage";

export const loader = async ({
  request,
  params,
}: LoaderFunctionArgs) => {

  if(`${request.url}`.endsWith(params.id!))
    return redirect(`${request.url}/bio`);

  const contributor = contributors.find(c => c.id === params.id);
  return {contributor, projects};
};

export default function Index() {
  const {contributor, projects} = useLoaderData<typeof loader>();
  return (
    <ContributorPage contributor={contributor} projects={projects} />
  );
}
