import { Metadata } from "next";
import HomeDashboard from "@/src/components/home/home-dashboard";

export const metadata: Metadata = {
  title: "Home | Taskly",
  description: "Home page",
};

export default async function HomePage() {
  return <HomeDashboard />;
}
