import type { MetaFunction } from "@remix-run/cloudflare";
import { useOutlet } from "@remix-run/react";
import Home from "~/pages/Home";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const outlet = useOutlet();
  return (
    outlet ? outlet : <Home />
  );
}

