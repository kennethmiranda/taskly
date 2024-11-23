"use client";

import Calendar from "@/src/components/home/calendar";

export default function HomeDashboard() {
  const streak = 0;

  return (
    <div className="space-y-6 p-2 sm:p-6 md:p-8">
      <div className="flex-1 sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="sm:flex-row sm:space-x-0.5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Calendar
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Current Streak: {streak}
          </p>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
