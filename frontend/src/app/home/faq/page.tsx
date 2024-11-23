import { fetchTest } from "@/src/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Task Manager and Cloud Storage System",
  description: "Frequently Asked Questions page",
};

export default async function FaqPage() {
  // remove in production
  // await fetchTest();

  return (
    <div className="space-y-6 p-2 sm:p-6 md:p-8">
      <div className="flex-1 sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="sm:flex-row">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
        </div>
      </div>
    </div>
  );
}
