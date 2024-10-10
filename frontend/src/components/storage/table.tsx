import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { DownloadIcon } from "@radix-ui/react-icons";
import { files } from "@/src/lib/placeholder-data";

export default function FileTable() {
  return (
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
                /* variant="outline" */
                size="icon"
                className="flex p-1.5 rounded-md size-7"
                type="submit"
                /* onClick={() => downloadFile(file.name)} */
              >
                <DownloadIcon className="h-5 w-5" />
              </Button>
            </TableCell>
            <TableCell>{file.name}</TableCell>
            <TableCell>{file.size}</TableCell>
            <TableCell>{file.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
