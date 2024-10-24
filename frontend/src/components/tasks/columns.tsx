"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/src/components/ui/checkbox";
import { priorities, statuses } from "@/src/lib/data";
import { Task } from "@/src/lib/definitions";
import { DataTableColumnHeader } from "@/src/components/tasks/data-table-column-header";
import { DataTableRowActions } from "@/src/components/tasks/data-table-row-actions";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/src/components/ui/button";
import { getStatusOrder, getPriorityOrder } from "@/src/lib/utils";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} title="Task" table={table} />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} title="Title" table={table} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} title="Due Date" table={table} />
    ),
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate");

      // If the dueDate is undefined or invalid, return an empty state
      if (!dueDate || !(dueDate instanceof Date)) {
        return <div className="flex items-center"></div>;
      }

      return (
        <div className="flex items-center">
          {new Date(dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} title="Status" table={table} />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const statusA = rowA.getValue(columnId) as string;
      const statusB = rowB.getValue(columnId) as string;
      return getStatusOrder(statusA) - getStatusOrder(statusB);
    },
  },
  {
    accessorKey: "priority",
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} title="Priority" table={table} />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const priorityA = rowA.getValue(columnId) as string;
      const priorityB = rowB.getValue(columnId) as string;
      return getPriorityOrder(priorityA) - getPriorityOrder(priorityB);
    },
  },
  {
    id: "actions",
    header: ({ table }) => (
      <Button
        onClick={() => {
          table.resetSorting(),
            table.toggleAllColumnsVisible(true),
            table.resetRowSelection();
          table.setPageSize(10);
        }}
        variant="ghost"
        aria-label="Reset table"
        className="-mx-1 flex items-center"
      >
        <ReloadIcon className="-mx-1 flex items-center" />
      </Button>
    ),
    cell: ({ row }) => {
      const task = row.original;

      const onDelete = async (id: string) => {
        try {
          const response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE', // Specify the HTTP method
            headers: {
              'Content-Type': 'application/json', // Specify content type
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete the task'); // Handle errors
          }
      
          // Optionally, refresh the data or update local state here
          console.log(`Task with id: ${id} deleted successfully`);
        } catch (error) {
          console.error("Error deleting task:", error);
          // Optionally show an error message to the user
        }
      };

      return (
        <DataTableRowActions row={row} onDelete={() => onDelete(task.id)} />
      );
    },
  },
];
