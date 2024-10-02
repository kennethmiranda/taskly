"use client";
import React, { useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import {
  PlusIcon,
  HomeIcon,
  ClipboardIcon,
  FolderIcon,
  PowerIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface Task {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  dueDate: Date;
  status: "Planned" | "In Progress" | "Completed" | "Cancelled";
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "test1",
    description: "test1",
    createdAt: new Date("2024-09-25"),
    dueDate: new Date("2024-10-05"),
    status: "In Progress",
  },
  {
    id: 2,
    title: "Design database schema",
    description: "Create database for the project",
    createdAt: new Date("2024-09-26"),
    dueDate: new Date("2024-10-03"),
    status: "Planned",
  },
  {
    id: 3,
    title: "test3",
    description: "test3",
    createdAt: new Date("2024-09-27"),
    dueDate: new Date("2024-10-10"),
    status: "Planned",
  },
  {
    id: 4,
    title: "Write documentation",
    description: "write docs",
    createdAt: new Date("2024-09-24"),
    dueDate: new Date("2024-10-08"),
    status: "Completed",
  },
];

const statusColors: Record<Task["status"], string> = {
  Planned: "bg-blue-500",
  "In Progress": "bg-yellow-500",
  Completed: "bg-green-500",
  Cancelled: "bg-red-500",
};

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({});
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState<number | null>(
    null
  );

  const handleCreateTask = () => {
    if (newTask.title && newTask.status) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        createdAt: new Date(),
        dueDate:
          newTask.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: newTask.status,
      };
      setTasks([...tasks, task]);
      setIsCreateFormOpen(false);
      setNewTask({});
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsCreateFormOpen(true);
  };

  const handleUpdateTask = () => {
    if (selectedTask) {
      setTasks(
        tasks.map((task) => (task.id === selectedTask.id ? selectedTask : task))
      );
      setIsCreateFormOpen(false);
      setSelectedTask(null);
    }
  };

  const handleStatusChange = (taskId: number, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    setStatusDropdownOpen(null);
  };

  return (
    <div className="absolute h-screen bg-gray-100 ">
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className={`${lusitana.className} text-3xl font-bold mb-6`}>
            Task Management
          </h2>
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={() => setIsCreateFormOpen(true)}
              className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create New Task
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                        {task.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                        {task.description || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {task.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {task.dueDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setStatusDropdownOpen(
                                statusDropdownOpen === task.id ? null : task.id
                              )
                            }
                            className="flex items-center text-sm"
                          >
                            <span
                              className={`w-3 h-3 rounded-full mr-2 ${
                                statusColors[task.status]
                              }`}
                            ></span>
                            {task.status}
                            <ChevronDownIcon className="h-4 w-4 ml-1" />
                          </button>
                          {statusDropdownOpen === task.id && (
                            <div className="fixed z-10 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                              <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                {(
                                  Object.keys(statusColors) as Array<
                                    Task["status"]
                                  >
                                ).map((status) => (
                                  <button
                                    key={status}
                                    onClick={() =>
                                      handleStatusChange(
                                        task.id,
                                        status as Task["status"]
                                      )
                                    }
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                  >
                                    <span
                                      className={`inline-block w-3 h-3 rounded-full mr-2 ${statusColors[status]}`}
                                    ></span>
                                    {status}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Create/Edit Task Modal */}
      {isCreateFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">
              {selectedTask ? "Edit Task" : "Create New Task"}
            </h3>
            <input
              type="text"
              placeholder="Title"
              value={selectedTask?.title || newTask.title || ""}
              onChange={(e) =>
                selectedTask
                  ? setSelectedTask({ ...selectedTask, title: e.target.value })
                  : setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded"
            />
            <textarea
              placeholder="Description"
              value={selectedTask?.description || newTask.description || ""}
              onChange={(e) =>
                selectedTask
                  ? setSelectedTask({
                      ...selectedTask,
                      description: e.target.value,
                    })
                  : setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded"
            />
            <label className="block mb-2 text-sm font-bold">Due Date</label>
            <input
              type="date"
              value={
                selectedTask?.dueDate.toISOString().split("T")[0] ||
                newTask.dueDate?.toISOString().split("T")[0] ||
                ""
              }
              onChange={(e) => {
                const date = new Date(e.target.value);
                selectedTask
                  ? setSelectedTask({ ...selectedTask, dueDate: date })
                  : setNewTask({ ...newTask, dueDate: date });
              }}
              className="w-full p-2 mb-4 border rounded"
            />
            <label className="block mb-2 text-sm font-bold">Status</label>
            <select
              value={selectedTask?.status || newTask.status || ""}
              onChange={(e) =>
                selectedTask
                  ? setSelectedTask({
                      ...selectedTask,
                      status: e.target.value as Task["status"],
                    })
                  : setNewTask({
                      ...newTask,
                      status: e.target.value as Task["status"],
                    })
              }
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="">Select Status</option>
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsCreateFormOpen(false);
                  setSelectedTask(null);
                }}
                className="mr-2 px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={selectedTask ? handleUpdateTask : handleCreateTask}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {selectedTask ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
