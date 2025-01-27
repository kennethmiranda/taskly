import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Task } from "@/src/lib/definitions";
import TaskForm from "@/src/components/tasks/edit-task-form";

async function getTaskById(
  taskId: string,
  userEmail: string
): Promise<Task | null> {
  try {
    const response = await fetch(
      `http://localhost:3002/api/tasks/${taskId}?userEmail=${userEmail}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch task");
    }

    const task = await response.json();
    return {
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      files: task.files?.map((file: File) => ({
        ...file,
        createdAt: new Date(),
      })),
    };
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
}

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return {
      title: "Task | Authentication Required",
      description: "Please sign in to view this task.",
    };
  }

  const task = await getTaskById(params.id, session.user.email);

  if (!task) {
    return {
      title: "Task Not Found",
      description: "The requested task could not be found.",
    };
  }

  return {
    title: `${task.title} | Taskly`,
    description: `Details for task: ${task.title}`,
  };
}

export default async function TaskPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <div className="p-8">Please sign in to view tasks</div>;
  }

  const userEmail = session.user.email;
  const task = await getTaskById(params.id, userEmail);

  if (!task) {
    notFound();
  }

  return <TaskForm task={task} userEmail={userEmail} taskId={params.id} />;
}
