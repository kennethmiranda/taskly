import { Table } from "@tanstack/react-table";
import { CreateTaskForm } from "@/src/components/tasks/create-task-form";
import { Task } from "@/src/lib/definitions";

interface DataTableCreateTaskProps<TData> {
  table: Table<TData>;
  onTasksChange?: () => void;
}

export function DataTableCreateTask<TData>({
  table,
  onTasksChange,
}: DataTableCreateTaskProps<TData>) {
  const handleCreateTask = (task: Task) => {
    if (onTasksChange) {
      onTasksChange();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <CreateTaskForm onCreateTask={handleCreateTask} />
    </div>
  );
}
