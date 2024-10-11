// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

import { Task } from "@/src/lib/definitions";

// https://nextjs.org/learn/dashboard-app/fetching-data
export const users = [
  {
    id: "143071933355917312",
    name: "Kenny",
    email: "user@nextmail.com",
    password: "123456",
    avatar: "8434111b06ba1df3eed123f4fc12d9ca",
  },
];

export const tasks: Task[] = [
  {
    id: "1",
    title: "test1",
    createdAt: new Date("2024-09-25"),
    dueDate: new Date("2024-10-05"),
    status: "in progress",
    priority: "low",
  },
  {
    id: "2",
    title: "Design database schema",
    createdAt: new Date("2024-09-26"),
    dueDate: new Date("2024-10-03"),
    status: "backlog",
    priority: "medium",
  },
  {
    id: "3",
    title: "Implement working Authentication for user sign in",
    createdAt: new Date("2024-09-27"),
    dueDate: new Date("2024-10-10"),
    status: "todo",
    priority: "low",
  },
  {
    id: "4",
    title: "Write documentation",
    createdAt: new Date("2024-09-24"),
    dueDate: new Date("2024-10-08"),
    status: "done",
    priority: "high",
  },
  {
    id: "5",
    title: "Add streak to calendar",
    createdAt: new Date("2024-09-24"),
    dueDate: new Date("2024-10-08"),
    status: "canceled",
    priority: "medium",
  },
];

export const files = [
  {
    name: "file1.docx",
    size: "2.5 MB",
    date: "10/2/2024",
  },
  {
    name: "file2.docx",
    size: "1 MB",
    date: "8/30/2024",
  },
  {
    name: "file3.docx",
    size: "3.5 MB",
    date: "9/28/2024",
  },
];
