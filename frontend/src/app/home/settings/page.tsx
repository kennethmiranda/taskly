import { fetchTest } from "@/src/lib/data";

export const metadata = {
  title: "Settings | Task Manager and Cloud Storage System",
  description: "Settings page",
};

export default async function PolicyPage() {
  // remove in production
  // await fetchTest();

  return (
    <main className="flex-1 p-8 overflow-auto max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
    </main>
  );
}
