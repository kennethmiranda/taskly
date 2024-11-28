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

export const formattedFileSize = (size: number | undefined) => {
  size = size ?? 0;
  if (size < 1000000) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size >= 1000000 && size < 10000000000) {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  } else if (size >= 10000000000) {
    return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }
};

export const formattedFileType = (type: string | undefined) => {
  if (type === "application/pdf") {
    return "PDF";
  } else if (
    type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "Word";
  } else if (
    type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return "Excel";
  } else if (
    type ===
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return "PowerPoint";
  } else if (
    type === "image/jpeg" ||
    type === "image/png" ||
    type === "image/jpg" ||
    type === "image/webp" ||
    type === "image/PNG" ||
    type === "image/JPG" ||
    type === "image/JPEG" ||
    type === "image/WEBP"
  ) {
    return "Image";
  } else if (type === "image/gif") {
    return "GIF";
  } else if (
    type === "application/zip" ||
    type === "application/x-rar-compressed"
  ) {
    return "Zip";
  } else if (type === "text/plain") {
    return "Text";
  } else if (type === "application/json") {
    return "JSON";
  } else if (type === "video/mp4") {
    return "Video";
  } else {
    return "File";
  }
};
