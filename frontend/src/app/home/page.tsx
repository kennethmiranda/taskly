// /src/app/home/page.tsx
import { Metadata } from "next";
import HomeDashboard from "@/src/components/home/home-dashboard";

export const metadata: Metadata = {
  title: "Home | Task Manager and Cloud Storage System",
  description: "Home page",
};

export default function HomePage() {
  return <HomeDashboard />;
}
