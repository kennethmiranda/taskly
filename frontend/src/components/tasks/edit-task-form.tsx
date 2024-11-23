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
  FormDescription,
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
import { useToast } from "@/src/hooks/use-toast";
import { IconLoader } from "@tabler/icons-react";
import { Separator } from "@/src/components/ui/separator";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>(task.files || []);
  const { toast } = useToast();

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
      setIsOpen(false);
      toast({
        title: "Success",
        description: "Task updated successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
        duration: 3000,
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
        duration: 3000,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "destructive",
        duration: 3000,
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
        duration: 3000,
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/home/tasks">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Back to Tasks</span>
            </Link>
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>
                  Make changes to your task here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Task title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Task description (optional)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date (optional)</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          The deadline of the task.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
                                {status.icon && (
                                  <status.icon className="mr-2 -mt-0.5 h-4 w-4 inline text-muted-foreground" />
                                )}
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem
                                key={priority.value}
                                value={priority.value}
                              >
                                {priority.icon && (
                                  <priority.icon className="mr-2 -mt-0.5 h-4 w-4 inline text-muted-foreground" />
                                )}
                                {priority.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold mb-1">{task.title}</h1>
          <p className="text-sm text-muted-foreground">
            Created on {format(task.createdAt, "PPP")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-16">
          {/* Description */}
          <div className="space-y-3">
            <h2 className="font-semibold mb-2">Description</h2>
            <div className="w-full h-[200px] overflow-y-auto rounded-lg border bg-background md:w-[650px] p-4">
              <div className="break-words whitespace-normal">
                <p className="text-sm">
                  {task.description || (
                    <span className="text-muted-foreground">
                      No description
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Task Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold mb-2">Due Date</h3>
                <p className="flex items-center gap 2 text-sm">
                  {task.dueDate ? (
                    format(task.dueDate, "PPP")
                  ) : (
                    <span className="text-muted-foreground">No due date</span>
                  )}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Status</h3>
                <div className="flex items-center gap-2 text-sm">
                  {(() => {
                    const status = statuses.find(
                      (s) => s.value === task.status
                    );
                    if (status) {
                      const Icon = status.icon;
                      return (
                        <>
                          <Icon className="h-4 w-4" />
                          <span>{status.label}</span>
                        </>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Priority</h3>
                <div className="flex items-center gap-2 text-sm">
                  {(() => {
                    const priority = priorities.find(
                      (p) => p.value === task.priority
                    );
                    if (priority) {
                      const Icon = priority.icon;
                      return (
                        <>
                          <Icon className="h-4 w-4" />
                          <span>{priority.label}</span>
                        </>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <h2 className="font-semibold">Attachments</h2>
            <div className="space-y-3">
              {files.length > 0 ? (
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleFileDelete(file.id)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground"></p>
              )}

              <div
                onClick={() => document.getElementById("file-upload")?.click()}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
