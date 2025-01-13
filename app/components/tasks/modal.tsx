import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/chadcn/dialog';

import { Task } from '@/app/lib/definitions';

export default function TaskModal({
  task,
  isOpen,
  setIsOpen,
}: {
  task: Task;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="hidden lg:block">
        <DialogHeader>
          <DialogTitle className="select-none">{task.title}</DialogTitle>
          <DialogDescription className="select-none">
            {task.description || 'No description'}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
