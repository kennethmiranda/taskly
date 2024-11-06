export type User = {
  id: string;
  name?: string;
  email: string;
  password?: string;
  image?: string;
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

export type EventType = {
  title: string;
  start: string | Date;
  allDay: boolean;
  backgroundColor?: string;
  borderColor?: string;
  url?: string;
  id: string; 
};
