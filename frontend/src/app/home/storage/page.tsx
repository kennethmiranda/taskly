import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { lusitana } from "@/src/components/ui/fonts";
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

async function downloadFile(fileName: string) {
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
}

const files = [
  {
    name: "file1.docx",
    size: "2.5 MB",
    date: "10/2/2024",
  },
  {
    name: "file2.docx",
    size: "1 MB",
    date: "8/30/2024",
  },
  {
    name: "file3.docx",
    size: "3.5 MB",
    date: "9/28/2024",
  },
];

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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.name}>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex p-2 rounded-md"
                    type="submit"
                    /* onClick={() => downloadFile(file.name)} */
                  >
                    <DownloadIcon />
                  </Button>
                </TableCell>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
