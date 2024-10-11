import { tasks } from "@/src/lib/placeholder-data";
import { Task } from "@/src/lib/definitions";

export async function fetchTest() {
  console.log("Fetching test data...");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("Data fetch completed after 3 seconds.");
}

export async function fetchTaskById(id: string): Promise<Task | undefined> {
  const task = tasks.find((task) => task.id === id);
  return task ? convertToTask(task) : undefined;
}

function convertToTask(task: any): Task {
  if (!isValidStatus(task.status)) {
    throw new Error(`Invalid status: ${task.status}`);
  }
  return {
    id: task.id,
    title: task.title,
    createdAt: new Date(task.createdAt),
    dueDate: new Date(task.dueDate),
    status: task.status as Task["status"],
    priority: task.priority,
  };
}

function isValidStatus(status: any): status is Task["status"] {
  return ["Planned", "In Progress", "Completed", "Cancelled"].includes(status);
}

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    value: "low",
    label: "Low",
    icon: ArrowDownIcon,
  },
  {
    value: "medium",
    label: "Medium",
    icon: ArrowRightIcon,
  },
  {
    value: "high",
    label: "High",
    icon: ArrowUpIcon,
  },
];
