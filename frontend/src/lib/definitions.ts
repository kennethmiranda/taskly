export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
};

/* type Task = {
  id: string;
  title: string;
  createdAt: Date;
  dueDate: Date;
  status: string;
  priority: string;
}; */

import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.date(),
  dueDate: z.date(),
  status: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
