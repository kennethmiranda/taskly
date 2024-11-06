'use client';

import Calendar from "@/src/components/home/calendar";
import { SessionProvider } from "next-auth/react";

export default function HomeContent() {
  const streak = 0;

  return (
    <SessionProvider>
      <main className="flex-1 p-8 max-w-8xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
        <p className="text-muted-foreground">Current Streak: {streak}</p>
        <Calendar />
      </main>
    </SessionProvider>
  );
}
