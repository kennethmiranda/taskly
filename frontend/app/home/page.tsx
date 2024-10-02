import { lusitana } from "@/app/ui/fonts";
import { Card } from "@/app/ui/home/cards";
import { fetchTest } from "@/app/lib/data";

export default async function Page() {
  const test = await fetchTest();

  return (
    <main className="flex-1 p-8 overflow-auto max-w-8xl mx-auto">
      <h2 className={`${lusitana.className} text-3xl font-bold mb-6`}>Home</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
    </main>
  );
}
