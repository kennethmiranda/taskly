import { Table } from "@tanstack/react-table";
import { CreateTaskForm } from "@/src/components/tasks/create-task-form";
import { Task } from "@/src/lib/definitions";


interface DataTableCreateTaskProps<TData> {
  table: Table<TData>;
}

export function DataTableCreateTask<TData>({
  table,
}: DataTableCreateTaskProps<TData>) {
  const handleCreateTask = async(newTask: Task) => {
    try{
     const response = await fetch("api/tasks",{
       method: "POST",
       headers:{
         "Content-Type": "applications/json"
       },
       body: JSON.stringify(newTask)
    });

    if(!response.ok){
      throw new Error("Failed to create task");
    };
    const data = await response.json();
    console.log("task created successfully:", data);
    }catch(error){
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <CreateTaskForm
        /* userId={currentUserId} */ onCreateTask={handleCreateTask}
      />
    </div>
  );
}
