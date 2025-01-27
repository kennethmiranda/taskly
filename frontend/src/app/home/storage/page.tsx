import { Button } from "@/src/components/ui/button";
import FileTable from "@/src/components/storage/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storage | Taskly",
  description: "Store your files securely.",
};

/* async function downloadFile(fileName: string) {
  try {
    const response = await fetch(`/api/files/download?name=${fileName}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("There was a problem with the download operation:", error);
  }
} */

export default async function StoragePage() {
  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight">File Storage</h2>

        {/* add file */}
        <div className="flex-grow mb-4 mt-4">
          <Button className="grid gap-6 rounded-xl sm:grid-cols-2 lg:grid-cols-4">
            Add File
          </Button>
        </div>

        <FileTable />
      </div>
    </main>
  );
}
