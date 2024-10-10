import { lusitana } from "@/src/components/fonts";
import { Card } from "@/src/components/ui/card";
import { fetchTest } from "@/src/lib/data";
import { CalendarIcon } from "@heroicons/react/20/solid";

export const metadata = {
  title: "Home | Task Manager and Cloud Storage System",
  description: "Home page",
};

export default async function HomePage() {
  // remove in production
  const test = await fetchTest();

  return (
    <main className="flex-1 p-8 overflow-auto max-w-8xl mx-auto">
      <h2 className={`${lusitana.className} text-3xl font-bold mb-6`}>
        Calendar
      </h2>
      <CalendarIcon />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
    </main>
  );
}
