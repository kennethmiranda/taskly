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
    title: "Tasks data table",
    createdAt: new Date("2024/09/25"),
    dueDate: undefined,
    status: "in progress",
    priority: "low",
  },
  {
    id: "2",
    title: "User authentication",
    createdAt: new Date("2024/09/26"),
    dueDate: null,
    status: "backlog",
    priority: "medium",
  },
  {
    id: "3",
    title: "Profile/settings UI Update",
    createdAt: new Date("2024/09/27"),
    dueDate: new Date("2024/10/10"),
    status: "todo",
    priority: "low",
  },
  {
    id: "4",
    title: "Tasks.id page",
    createdAt: new Date("2024/09/24"),
    dueDate: null,
    status: "done",
    priority: "high",
  },
  {
    id: "5",
    title: "Terms of service / Privacy policy page",
    createdAt: new Date("2024/09/24"),
    dueDate: new Date("2024/10/08"),
    status: "canceled",
    priority: "medium",
  },
  {
    id: "6",
    title: "Skeletons",
    createdAt: new Date("2024/09/25"),
    dueDate: new Date("2024/10/12"),
    status: "in progress",
    priority: "low",
  },
  {
    id: "7",
    title: "Tooltips",
    createdAt: new Date("2024/09/26"),
    dueDate: new Date("2024/10/04"),
    status: "backlog",
    priority: "medium",
  },
  {
    id: "8",
    title: "Create task",
    createdAt: new Date("2024/09/28"),
    dueDate: new Date("2024/10/7"),
    status: "todo",
    priority: "high",
  },
  {
    id: "9",
    title: "Edit to go to tasks/id page",
    createdAt: new Date("2024/09/29"),
    dueDate: new Date("2024/10/5"),
    status: "in progress",
    priority: "medium",
  },
  {
    id: "10",
    title: "Share task",
    createdAt: new Date("2024/09/30"),
    dueDate: new Date("2024/10/15"),
    status: "done",
    priority: "low",
  },
  {
    id: "11",
    title: "Delete task",
    createdAt: new Date("2024/10/01"),
    dueDate: new Date("2024/10/12"),
    status: "backlog",
    priority: "low",
  },
  {
    id: "12",
    title: "Select?",
    createdAt: new Date("2024/10/02"),
    dueDate: null,
    status: "todo",
    priority: "medium",
  },
  {
    id: "13",
    title: "Setting: Ask if user wants notifications of due dates or not",
    createdAt: new Date("2024/10/03"),
    dueDate: new Date("2024/10/4"),
    status: "in progress",
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
