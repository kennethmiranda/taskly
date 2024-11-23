"use client";

import { useState } from "react";
import { DataTable } from "@/src/components/tasks/data-table";
import { columns } from "@/src/components/tasks/columns";
import { Task } from "@/src/lib/definitions";

interface TaskDashboardProps {
  initialTasks: Task[];
  userEmail: string;
}

export function TaskDashboard({ initialTasks, userEmail }: TaskDashboardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3002/api/tasks?userEmail=${userEmail}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const newTasks = await response.json();
      setTasks(newTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-2 sm:p-6 md:p-8">
      <div className="flex-1 sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="sm:flex-row sm:space-x-0.5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Tasks
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground sm:mt-0">
            Here&apos;s a list of your tasks
          </p>
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2 sm:mt-0">
            Error: {error}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center">Loading tasks...</div>
      ) : (
        <DataTable data={tasks} columns={columns} onTasksChange={fetchTasks} />
      )}
    </div>
  );
}
