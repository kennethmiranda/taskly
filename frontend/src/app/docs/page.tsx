import HeaderNav from "@/src/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | Task Manager and File Storage System",
  description: "Documentation page",
};

export default function DocumentationPage() {
  return (
    <main className="flex-1 p-8 max-w-8xl mx-auto">
      <HeaderNav />
      <h2 className="text-2xl font-bold tracking-tight">Documentation</h2>
      <div className="flex-grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
    </main>
  );
}
