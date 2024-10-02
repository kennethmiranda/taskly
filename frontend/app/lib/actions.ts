"use server";

export async function createTask(formData: FormData) {
  const rawFormData = {
    taskId: formData.get("taskId"),
    taskDescription: formData.get("taskDescription"),
    status: formData.get("status"),
  };
  // Test it out:
  console.log(rawFormData);
}
