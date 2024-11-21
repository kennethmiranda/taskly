"use client";

import { Task, File } from "@/src/lib/definitions";
import { statuses, priorities } from "@/src/lib/data";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";
import {
  CalendarIcon,
  ChevronLeft,
  FileIcon,
  PencilIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { toast } from "@/src/hooks/use-toast";
import { IconLoader } from "@tabler/icons-react";

type TaskStatus = "backlog" | "todo" | "in progress" | "done" | "canceled";
type TaskPriority = "low" | "medium" | "high";

const formSchema = z.object({
  title: z
    .string({
      required_error: "A title is required.",
    })
    .min(1, "A title is required.")
    .max(30, "Title must be less than 30 characters."),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  status: z.enum(
    ["backlog", "todo", "in progress", "done", "canceled"] as const,
    {
      required_error: "A status is required.",
    }
  ),
  priority: z.enum(["low", "medium", "high"] as const, {
    required_error: "A priority is required.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface TaskFormProps {
  task: Task;
  userEmail: string;
  taskId: string;
}

async function updateTask(taskId: string, userEmail: string, data: FormData) {
  try {
    console.log("Updating task...", { taskId, userEmail, data });
    /* const response = await fetch();

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    return await response.json(); */
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

async function deleteFile(taskId: string, userEmail: string, fileId: string) {
  try {
    console.log("Deleting file...", { taskId, userEmail, fileId });
    /* const response = await fetch();

    if (!response.ok) {
      throw new Error("Failed to delete file");
    }

    return await response.json(); */
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

export default function TaskForm({ task, userEmail, taskId }: TaskFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>(task.files || []);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate,
      status: task.status as TaskStatus,
      priority: task.priority as TaskPriority,
    },
  });

  const handleSubmit = async (values: FormSchema) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          if (value instanceof Date) {
            formData.append(key, value.toISOString());
          } else {
            formData.append(key, value);
          }
        }
      });

      await updateTask(taskId, userEmail, formData);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileUpload = async (fileList: FileList) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Array.from(fileList).forEach((file) => {
        formData.append("files", file);
      });
      await updateTask(taskId, userEmail, formData);
      // Simulating file upload
      const newFiles: File[] = Array.from(fileList).map((file, index) => ({
        id: `new-file-${Date.now()}-${index}`,
        taskId: taskId,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
      }));
      setFiles([...files, ...newFiles]);
      toast({
        title: "Success",
        description: "Files uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileDelete = async (fileId: string) => {
    try {
      setIsLoading(true);
      await deleteFile(taskId, userEmail, fileId);
      setFiles(files.filter((file) => file.id !== fileId));
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Back and Edit buttons */}
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/home/tasks">
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>Back to Tasks</span>
              </Link>
            </Button>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Task
              </Button>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className={cn(
                        "text-3xl font-semibold border-none focus-visible:ring-0",
                        !isEditing && "pointer-events-none bg-transparent p-0"
                      )}
                      placeholder="Task title"
                      readOnly={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-sm text-muted-foreground">
              Created on {format(task.createdAt, "PPP")}
            </div>
          </div>

          {/* Description */}
          <div className="bg-card p-6 rounded-lg border">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add task description..."
                      className={cn(
                        "min-h-[120px] resize-none mt-2",
                        !isEditing &&
                          "pointer-events-none bg-transparent p-0 border-none"
                      )}
                      readOnly={!isEditing}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Task Details */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Task Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    {isEditing ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Set due date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <div className="text-sm mt-1">
                        {field.value
                          ? format(field.value, "PPP")
                          : "No due date set"}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    {isEditing ? (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statuses.map(({ value, label, icon: Icon }) => (
                            <SelectItem key={value} value={value}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-2 text-sm mt-1">
                        {(() => {
                          const status = statuses.find(
                            (s) => s.value === field.value
                          );
                          if (status) {
                            const Icon = status.icon;
                            return <Icon className="h-4 w-4" />;
                          }
                          return null;
                        })()}
                        {statuses.find((s) => s.value === field.value)?.label}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    {isEditing ? (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities.map(({ value, label, icon: Icon }) => (
                            <SelectItem key={value} value={value}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-2 text-sm mt-1">
                        {(() => {
                          const priority = priorities.find(
                            (p) => p.value === field.value
                          );
                          if (priority) {
                            const Icon = priority.icon;
                            return <Icon className="h-4 w-4" />;
                          }
                          return null;
                        })()}
                        {priorities.find((p) => p.value === field.value)?.label}
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* File Attachments */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Attachments</h2>
            <div className="space-y-4">
              {files.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-accent/50 transition-colors"
                    >
                      <FileIcon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size ?? 0 / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleFileDelete(file.id)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {isEditing && (
                <div
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer",
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.length) {
                        handleFileUpload(e.target.files);
                      }
                    }}
                  />
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <UploadIcon className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      Drag and drop files here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported files: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {isEditing && (
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    Saving...
                    <IconLoader className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
