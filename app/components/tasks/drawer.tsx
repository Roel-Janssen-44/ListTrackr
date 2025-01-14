import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/components/chadcn/drawer';
import { Button } from '@/app/components/chadcn/button';
import { Task } from '@/app/lib/definitions';

export default function TaskModal({
  task,
  mobileIsOpen,
  setMobileIsOpen,
}: {
  task: Task;
  mobileIsOpen: boolean;
  setMobileIsOpen: (open: boolean) => void;
}) {
  return (
    <Drawer open={mobileIsOpen} onOpenChange={setMobileIsOpen}>
      <DrawerContent className="block select-none bg-white lg:hidden">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
