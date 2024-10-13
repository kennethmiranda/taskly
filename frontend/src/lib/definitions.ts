export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type Task = {
  id: string;
  userId: User["id"];
  title: string;
  description?: string;
  createdAt: Date;
  dueDate?: Date;
  updatedAt?: Date;
  status: string;
  priority: string;
};

import { optional, z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  dueDate: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  status: z.string(),
  priority: z.string(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
