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
