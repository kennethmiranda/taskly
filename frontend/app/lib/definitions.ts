export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Task = {
  task_id: string;
  task_name: string;
  task_description: string;
  startDate: string;
  endDate: string;
  status: "Planned" | "In Progress" | "Completed" | "Cancelled";
};
