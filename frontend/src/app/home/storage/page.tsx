import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { lusitana } from "@/src/components/fonts";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Separator } from "@/src/components/ui/separator";
import { DownloadIcon } from "@radix-ui/react-icons";
import FileTable from "@/src/components/storage/table";

export const metadata = {
  title: "Storage | Task Manager and Cloud Storage System",
  description: "Store your files securely in the cloud.",
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
    <main className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className={`${lusitana.className} text-3xl font-bold mb-6`}>
          File Storage
        </h2>

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
