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

interface ShareTaskProps {
  taskId: string;
  onOpenChange: (open: boolean) => void;
}

export function ShareTask({ taskId, onOpenChange }: ShareTaskProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(true);
  const [tasks, setTasks] = useState<Task | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/tasks/${taskId}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          if (response.status === 404) return null;
          throw new Error("Failed to fetch task");
        }

        const task = await response.json();
        setTasks({
          ...task,
        });
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
    if (isCopied) {
      navigator.clipboard.writeText(
        `http://localhost:3000/home/tasks/${taskId}`
      );
      toast({
        title: "Link copied",
        description: "The link has been copied to your clipboard.",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share task: {tasks?.title}</DialogTitle>
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
              defaultValue={`http://localhost:3000/home/tasks/${taskId}`}
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
