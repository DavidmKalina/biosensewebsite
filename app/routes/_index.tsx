import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, useOutlet } from "@remix-run/react";
import { contributors, projects } from "~/data/sampleData";
import Home from "~/pages/Home";
import { useNetworkConnectivity } from '@remix-pwa/client';
import { toaster } from "~/components/ui/toaster";
import { useReducer } from "react";

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
  useNetworkConnectivity({
    onOnline: () => {
      const id = 'network-connectivity'
      const title = 'You are back online'
      const description = 'Seemed your network went for a nap, glad to have you back!'
      const type = 'message'
  
      setTimeout(() => toaster.create({ type, title, id, description }), 1);
    },
  
    onOffline: () => {
      const id = 'network-connectivity'
      const title = 'You are offline'
      const description = 'Seems like you are offline, check your network connection'
      const type = 'warning'
  
      setTimeout(() => toaster.create({ type, title, id, description }), 1);
    }
  })
  const {projects, contributors} = useLoaderData<typeof loader>();
  return (
    outlet ? outlet : <Home projects={projects} contributors={contributors} />
  );
}

