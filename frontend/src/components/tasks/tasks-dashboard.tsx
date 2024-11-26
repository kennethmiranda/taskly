"use client";

import { useState } from "react";
import { DataTable } from "@/src/components/tasks/data-table";
import { columns } from "@/src/components/tasks/columns";
import { Task } from "@/src/lib/definitions";
import { Skeleton } from "@/src/components/ui/skeleton";

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
        <div className="space-y-6 p-2 sm:p-6 md:p-8">
          {/* Header */}
          <div className="space-y-2">
            <Skeleton className="h-9 w-[120px]" /> {/* Tasks */}
            <Skeleton className="h-5 w-[180px]" /> {/* Here's a list... */}
          </div>

          {/* Command Bar */}
          <div className="flex gap-2 items-center">
            <Skeleton className="h-9 w-[100px]" /> {/* Create Task button */}
            <Skeleton className="h-9 w-[300px]" /> {/* Search input */}
            <div className="flex gap-2 mr-auto">
              <Skeleton className="h-9 w-[100px]" /> {/* Status filter */}
              <Skeleton className="h-9 w-[100px]" /> {/* Priority filter */}
            </div>
          </div>

          {/* Table Header */}
          <div className="rounded-md border">
            <div className="border-b p-3">
              <div className="grid grid-cols-7 gap-3 items-center">
                <Skeleton className="flex h-4 w-[20px]" /> {/* Checkbox */}
                <Skeleton className="flex -ml-36 h-4 w-[50px]" /> {/* Task */}
                <Skeleton className="flex -ml-20 h-4 w-[50px]" /> {/* Title */}
                <Skeleton className="flex h-4 w-[50px]" /> {/* Due Date */}
                <Skeleton className="flex ml-6 h-4 w-[50px]" /> {/* Status */}
                <Skeleton className="flex ml-28 h-4 w-[50px]" />{" "}
                {/* Priority */}
                <Skeleton className="flex ml-28 h-4 w-[20px]" /> {/* Actions */}
              </div>
            </div>

            {/* Table Rows */}
            {[...Array(10)].map((_, index) => (
              <div key={index} className="border-b p-4">
                <div className="grid grid-cols-7 gap-4 items-center">
                  <Skeleton className="h-4 w-[20px]" /> {/* Checkbox */}
                  <Skeleton className="-ml-36 h-4 w-[50px]" /> {/* Task */}
                  <Skeleton className="-ml-20 h-4 w-[50px]" /> {/* Title */}
                  <Skeleton className="h-4 w-[50px]" /> {/* Due Date */}
                  <Skeleton className="h-4 ml-6 w-[50px]" /> {/* Status */}
                  <Skeleton className="h-4 ml-28 w-[50px]" /> {/* Priority */}
                  <Skeleton className="h-4 ml-28 w-[20px]" /> {/* Actions */}
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer */}
          <div className="-mt-1 flex items-center justify-between">
            <Skeleton className="h-4 w-[200px]" /> {/* Selected items count */}
            <div className="flex gap-2 items-center">
              <Skeleton className="h-8 w-[100px]" /> {/* Items per page */}
              <Skeleton className="h-8 w-[100px]" /> {/* Page numbers */}
              <div className="flex gap-2 px-5">
                <Skeleton className="h-8 w-[100px]" /> {/* Page numbers */}
              </div>
              <div className="flex gap-1">
                <Skeleton className="h-8 w-8" /> {/* First page */}
                <Skeleton className="h-8 w-8" /> {/* Prev page */}
                <Skeleton className="h-8 w-8" /> {/* Next page */}
                <Skeleton className="h-8 w-8" /> {/* Last page */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DataTable data={tasks} columns={columns} onTasksChange={fetchTasks} />
      )}
    </div>
  );
}
