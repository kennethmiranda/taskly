import { Table } from "@tanstack/react-table";
import { CreateTaskForm } from "@/src/components/tasks/create-task-form";
import { Task } from "@/src/lib/definitions";

interface DataTableCreateTaskProps<TData> {
  table: Table<TData>;
}

export function DataTableCreateTask<TData>({
  table,
}: DataTableCreateTaskProps<TData>) {
  const handleCreateTask = (newTask: Task) => {
    console.log("Creating a new task", newTask);
  };

  return (
    <div className="flex items-center gap-2">
      <CreateTaskForm
        /* userId={currentUserId} */ onCreateTask={handleCreateTask}
      />
    </div>
  );
}
