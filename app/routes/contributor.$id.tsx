import { LoaderFunctionArgs, redirect } from "@remix-run/node"; // or cloudflare/deno
import ContributorPage from "~/pages/ContributorPage";

export const loader = async ({
  request,
  params,
}: LoaderFunctionArgs) => {

  if(`${request.url}`.endsWith(params.id!))
    return redirect(`${request.url}/bio`);

  return null;
};

export default function Index() {
  return (
    <ContributorPage />
  );
}
