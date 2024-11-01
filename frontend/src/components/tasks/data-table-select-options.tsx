import { Table } from "@tanstack/react-table";
import { Button } from "@/src/components/ui/button";
import { Task } from "@/src/lib/definitions";



import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { priorities, statuses } from "@/src/lib/data";
import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

interface DataTableSelectOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableSelectOptions<TData extends Task>({
  table,
}: DataTableSelectOptionsProps<TData>) {

//Stores selected rows id and userIds to a map.
const selectedRows = table.getSelectedRowModel().flatRows;
const selectedTasks = selectedRows.map(row => ({
  id: row.original.id,
  userId: row.original.userId,
}));


//Genereal api request function to avoid redundency
const apiRequest = async (
  taskId: string,
  userId: string,
  method: 'DELETE' | 'PATCH',
  body: Record<string, any> | null = null
) => {
  const response = await fetch(`http://localhost:3002/api/tasks/${taskId}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'userId': userId,
    },
    body: body ? JSON.stringify(body) : null, // Convert body to JSON if it's provided
  });

  if (!response.ok) {
    throw new Error(`Failed to ${method === 'DELETE' ? 'delete' : 'update'} task with id: ${taskId}`);
  }
  return response;
};

//Handles selected deletion
const handleDeleteSelected = async () => {
  if (selectedTasks.length === 0) {
    console.log("No tasks selected for deletion.");
    return;
  }
  
  try {
    const deleteRequests = selectedTasks.map(task => apiRequest(task.id, task.userId, 'DELETE'));
    await Promise.all(deleteRequests);
    
    console.log(`Selected tasks deleted successfully: ${selectedTasks.map(task => task.id).join(', ')}`);
  } catch (error) {
    console.error("Error deleting selected tasks:", error);
  }
};

//Handles selected status changes.
const handleChangeStatus = async (newStatus: string) => {
  try {
    const statusUpdateRequests = selectedTasks.map(task =>
      apiRequest(task.id, task.userId, 'PATCH', { status: newStatus })
    );
    await Promise.all(statusUpdateRequests);

    console.log(`Status updated to '${newStatus}' for selected tasks: ${selectedTasks.map(task => task.id).join(', ')}`);
  } catch (error) {
    console.error("Error changing status of tasks:", error);
  }
};

//Handles changes in priority
const handleChangePriority = async (newPriority: string) => {
  try {
    const priorityUpdateRequests = selectedTasks.map(task =>
      apiRequest(task.id, task.userId, 'PATCH', { priority: newPriority })
    );
    await Promise.all(priorityUpdateRequests);

    console.log(`Priority updated to '${newPriority}' for selected tasks: ${selectedTasks.map(task => task.id).join(', ')}`);
  } catch (error) {
    console.error("Error changing priority of tasks:", error);
  }
};

  return (
    table.getSelectedRowModel().flatRows.length > 0 && (
      <div className="flex items-center gap-2">
        <Button
          onClick={handleDeleteSelected}
          variant="destructive"
          size="sm"
          className="h-8 rounded-md"
        >
          Delete Selected
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 rounded-md">
              Change Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status.value}
                onSelect={() => handleChangeStatus(status.value)}
              >
                {status.icon && (
                  <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                )}
                <span>{status.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 rounded-md">
              Change Priority
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {priorities.map((priority) => (
              <DropdownMenuItem
                key={priority.value}
                onSelect={() => handleChangePriority(priority.value)}
              >
                {priority.icon && (
                  <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                )}
                <span>{priority.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  );
}
