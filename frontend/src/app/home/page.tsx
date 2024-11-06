// /src/app/home/page.tsx
import { Metadata } from "next";
import HomeContent from "@/src/app/home/HomeContent";

export const metadata: Metadata = {
  title: "Home | Task Manager and Cloud Storage System",
  description: "Home page",
};

export default function HomePage() {
  return <HomeContent />;
}
