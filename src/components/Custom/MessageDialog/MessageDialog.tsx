import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../Button/Button";

type MessageDialogProps = {
  header: string;
  open: boolean;
  setOpen: () => void;
  children: React.ReactNode;
  confirm?: () => void;
  dismiss?: () => void;
};

export default function MessageDialog({
  header,
  open,
  setOpen,
  children,
  confirm,
  dismiss,
}: MessageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rtl">
        <DialogHeader>
          <DialogTitle className="flex justify-center mb-4">
            {header}
          </DialogTitle>
          <DialogDescription className="flex">
            {children}
            
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full !flex !justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              dismiss?.();
              setOpen();
            }}
          >
            رد
          </Button>

          <Button
            onClick={() => {
              confirm?.();
              setOpen();
            }}
          >
            تایید
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
