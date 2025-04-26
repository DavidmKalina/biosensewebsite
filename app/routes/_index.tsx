import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, useOutlet } from "@remix-run/react";
import { contributors, projects } from "~/data/sampleData";
import Home from "~/pages/Home";

export async function loader({
  params,
}: LoaderFunctionArgs) {
  return {projects, contributors};
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const outlet = useOutlet();
  const {projects, contributors} = useLoaderData<typeof loader>();
  return (
    outlet ? outlet : <Home projects={projects} contributors={contributors} />
  );
}

