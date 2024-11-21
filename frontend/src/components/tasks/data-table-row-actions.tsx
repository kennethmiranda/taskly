"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { Task } from "@/src/lib/definitions";
import { ShareTask } from "@/src/components/tasks/share-task";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { PencilIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onDelete: (id: string) => Promise<void>;
}

export function DataTableRowActions<TData>({
  row,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  const task = row.original as Task;
  const router = useRouter();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const handleEdit = () => {
    router.push(`/home/tasks/${task.id}`);
  };
  const handleShare = () => {
    setIsShareOpen(true);
  };
  const handleDelete = async () => {
    try {
      await onDelete(task.id);
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsDeleteAlertOpen(false); // Close the alert dialog
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={handleEdit}>
            <PencilIcon className="h-5 w-5 pr-2" />
            Edit
          </DropdownMenuItem>
          {/* Share Feature temporarily disabled */}
          <DropdownMenuItem className="hidden" onClick={handleShare}>
            <ShareIcon className="h-5 w-5 pr-2" />
            Share
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDeleteAlertOpen(true)}>
            <TrashIcon className="h-5 w-5 pr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isShareOpen && (
        <ShareTask
          taskId={task.id}
          onOpenChange={(open) => setIsShareOpen(open)}
        />
      )}
    </>
  );
}
