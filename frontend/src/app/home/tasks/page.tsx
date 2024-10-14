import { tasks } from "@/src/lib/placeholder-data";
import { Metadata } from "next";
import { DataTable } from "@/src/components/tasks/data-table";
import { columns } from "@/src/components/tasks/columns";

export const metadata: Metadata = {
  title: "Tasks | Task Manager and Cloud Storage System",
  description: "Manage your tasks.",
};

async function getTasks() {
  return tasks;
}

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <div className="space-y-6 h-full mx-auto">
      <div className="flex-1 items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks
          </p>
        </div>
        <div className="flex items-center space-x-2"></div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
