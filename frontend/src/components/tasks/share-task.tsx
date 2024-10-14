import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Task } from "@/src/lib/definitions";
import { useEffect, useState } from "react";
import { useToast } from "@/src/hooks/use-toast";
import { tasks } from "@/src/lib/placeholder-data";

interface ShareTaskProps {
  taskId: string;
  onOpenChange: (open: boolean) => void;
}

export function ShareTask({ taskId, onOpenChange }: ShareTaskProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(true);
  const [task, setTask] = useState<Task | null>(null);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = tasks.find((task) => task.id === taskId) || null;
        setTask(fetchedTask);
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange(open);
  };

  const handleCopy = () => {
    if (task) {
      navigator.clipboard.writeText(
        `http://localhost:3000/home/tasks/${task.id}`
      );
      toast({
        title: "Link copied",
        description: "The link has been copied to your clipboard.",
        duration: 3000,
      });
    }
  };

  if (!task) {
    return null; // or a loading state
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share task: {task.title}</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this task.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`http://localhost:3000/home/tasks/${task.id}`}
              readOnly
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => handleCopy()}
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
