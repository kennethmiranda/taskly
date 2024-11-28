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
import React, { useState } from "react";
import { useToast } from "@/src/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { useSession } from "next-auth/react";

interface DataTableSelectOptionsProps<TData> {
  table: Table<TData>;
  onTasksChange?: () => void;
}

export function DataTableSelectOptions<TData extends Task>({
  table,
  onTasksChange,
}: DataTableSelectOptionsProps<TData>) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { data: userSession } = useSession();

  //Stores selected rows id and userIds to a map.
  const selectedRows = table.getSelectedRowModel().flatRows;
  const selectedTasks = selectedRows.map((row) => ({
    id: row.original.id,
    userId: row.original.userId,
  }));

  //Genereal api request function to avoid redundency
  const apiRequest = async (
    taskId: string,
    method: "DELETE" | "PATCH",
    body: Record<string, any> | null = null
  ) => {
    let userEmail = userSession?.user?.email;
    userEmail = userEmail || ""; // Set userEmail to an empty string if not found
    const response = await fetch(`http://localhost:3002/api/tasks/${taskId}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        userEmail: userEmail, // Move userEmail inside headers
      },
      body: body ? JSON.stringify({ ...body, userEmail: userEmail }) : null,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to ${
          method === "DELETE" ? "delete" : "update"
        } task with id: ${taskId}`
      );
    }
    return response;
  };

  //Handles selected deletion
  const handleDeleteSelected = async () => {
    if (selectedTasks.length === 0) {
      return;
    }
    setLoading(true);

    try {
      const deleteRequests = selectedTasks.map(async (task) => {
        const response = await fetch(
          `http://localhost:3002/api/tasks/${task.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              userId: task.userId, // Assuming you have userSession with user.id
            },
          }
        );

        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`Failed to delete task with id: ${task.id}`);
        }
      });
      await Promise.all(deleteRequests);

      toast({
        title: "Success",
        description: "Task deleted successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsDeleteAlertOpen(false);
      setLoading(false);
      if (onTasksChange) {
        onTasksChange();
      }
    }
  };

  //Handles selected status changes.
  const handleChangeStatus = async (newStatus: string) => {
    try {
      const statusUpdateRequests = selectedTasks.map((task) =>
        apiRequest(task.id, "PATCH", { status: newStatus })
      );
      await Promise.all(statusUpdateRequests);

      toast({
        title: "Success",
        description: "Status changed successfully!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change status. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      if (onTasksChange) {
        onTasksChange();
      }
    }
  };

  //Handles changes in priority
  const handleChangePriority = async (newPriority: string) => {
    try {
      const priorityUpdateRequests = selectedTasks.map((task) =>
        apiRequest(task.id, "PATCH", { priority: newPriority })
      );
      await Promise.all(priorityUpdateRequests);

      toast({
        title: "Success",
        description: "Priority changed successfully!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change priority. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      if (onTasksChange) {
        onTasksChange();
      }
    }
  };

  return (
    table.getSelectedRowModel().flatRows.length > 0 && (
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setIsDeleteAlertOpen(true)}
          variant="destructive"
          size="sm"
          className="h-8 rounded-md"
          disabled={loading}
        >
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete Selected"
          )}
        </Button>

        <AlertDialog
          open={isDeleteAlertOpen}
          onOpenChange={setIsDeleteAlertOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                selected tasks.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteSelected}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-md hidden md:flex"
              disabled={loading}
            >
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
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-md hidden md:flex"
              disabled={loading}
            >
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
