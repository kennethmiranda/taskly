import { priorities, statuses } from "@/src/lib/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// helper function to get index of status
export const getStatusOrder = (status: string) => {
  return statuses.findIndex((s) => s.value === status);
};

// helper function to get index of priority
export const getPriorityOrder = (priority: string) => {
  return priorities.findIndex((p) => p.value === priority);
};
