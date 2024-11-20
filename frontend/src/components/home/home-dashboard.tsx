"use client";

import Calendar from "@/src/components/home/calendar";
import { SessionProvider } from "next-auth/react";

export default function HomeDashboard() {
  const streak = 0;

  return (
    <SessionProvider>
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto md:ml-4">
        <h2 className="text-lg md:text-2xl font-bold tracking-tight">
          Calendar
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Current Streak: {streak}
        </p>
        <Calendar />
      </main>
    </SessionProvider>
  );
}
