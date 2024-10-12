import Calendar from "@/src/components/home/calendar";
import { fetchTest } from "@/src/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Task Manager and Cloud Storage System",
  description: "Home page",
};

export default async function HomePage() {
  // remove in production
  // await fetchTest();

  const streak = 0;

  return (
    <main className="flex-1 p-8 max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
      <p className="text-muted-foreground">Current Streak: {streak}</p>
      <div className="flex items-center space-x-2"></div>
      <Calendar />
    </main>
  );
}
