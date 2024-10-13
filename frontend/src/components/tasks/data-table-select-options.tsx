import { Table } from "@tanstack/react-table";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { priorities, statuses } from "@/src/lib/data";

interface DataTableSelectOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableSelectOptions<TData>({
  table,
}: DataTableSelectOptionsProps<TData>) {
  const handleDeleteSelected = () => {
    console.log(
      "Deleting selected tasks:",
      table.getSelectedRowModel().flatRows
    );
  };
  const handleChangeStatus = (newStatus: string) => {
    console.log("Changing status of selected tasks to:", newStatus);
  };
  const handleChangePriority = (newPriority: string) => {
    console.log("Changing priority of selected tasks to:", newPriority);
  };

  return (
    table.getSelectedRowModel().flatRows.length > 0 && (
      <div className="flex items-center -mb-1 gap-2">
        <Button onClick={handleDeleteSelected} variant="destructive">
          Delete Selected
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Change Status</Button>
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
            <Button variant="outline">Change Priority</Button>
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
