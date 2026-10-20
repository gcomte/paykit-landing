import { redirect } from "next/navigation";
import { hasAccess } from "@/lib/access";
import Landing from "@/components/Landing";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  if (!(await hasAccess())) redirect("/access");
  return <Landing contactEmail="info@synonym.to" />;
}
