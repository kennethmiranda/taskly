import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { TaskDashboard } from "@/src/components/tasks/tasks-dashboard";

export const metadata: Metadata = {
  title: "Tasks | Task Manager and Cloud Storage System",
  description: "Manage your tasks.",
};

async function getTasks(userEmail: string) {
  try {
    const response = await fetch(
      `http://localhost:3002/api/tasks?userEmail=${userEmail}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export default async function TasksPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <div>Please sign in to view tasks</div>;
  }

  const initialTasks = await getTasks(session.user.email);

  return (
    <TaskDashboard initialTasks={initialTasks} userEmail={session.user.email} />
  );
}
