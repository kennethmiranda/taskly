import { fetchTaskById, fetchTest } from "@/src/lib/data";
import { files, tasks } from "@/src/lib/placeholder-data";
import { DownloadIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const task = await fetchTaskById(params.id);
  if (!task) {
    return {
      title: "Task Not Found",
      description: "The requested task could not be found.",
    };
  }
  return {
    title: `Task ${task.id} | Task Manager and Cloud Storage System`,
    description: `Details for Task ${task.id}`,
  };
}

export default async function TaskPage({ params }: Props) {
  const task = await fetchTaskById(params.id);

  if (!task) {
    notFound();
  }

  // remove in production
  // await fetchTest();

  return (
    <main className="flex-1 p-8 max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold tracking-tight">
        Task {task.id}: {task.title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Created At</h3>
          <p>{new Date(task.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Due Date</h3>
          <p>{task.dueDate?.toLocaleDateString()}</p>
        </div>
      </div>
      Files: {files.map((file) => file.name).join(", ")}
      <DownloadIcon className="w-6 h-6" />
    </main>
  );
}
