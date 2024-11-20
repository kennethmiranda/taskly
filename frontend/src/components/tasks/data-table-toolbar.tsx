"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Task } from "@/src/lib/definitions";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

import { priorities, statuses } from "@/src/lib/data";
import { DataTableFacetedFilter } from "@/src/components/tasks/data-table-faceted-filter";
import { DataTableSelectOptions } from "@/src/components/tasks/data-table-select-options";
import { DataTableCreateTask } from "@/src/components/tasks/data-table-create-task";

interface DataTableToolbarProps<TData extends Task> {
  table: Table<TData>;
  onTasksChange?: () => void;
}

export function DataTableToolbar<TData extends Task>({
  table,
  onTasksChange,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableCreateTask table={table} onTasksChange={onTasksChange} />
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="hidden lg:flex space-x-2">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}
          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorities}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableSelectOptions table={table} onTasksChange={onTasksChange} />
    </div>
  );
}
