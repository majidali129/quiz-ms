"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cloneElement, ReactElement, ReactNode, useState } from "react";

type DialogShellProps = {
  children: ReactElement<{ onClose?: () => void }>;
  triggerText: string;
  title?: string;
  description: string;
  trigger: ReactNode;
};

export const DialogShell = ({ children, title, description, trigger }: DialogShellProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent className="sm:!max-w-[42rem] gap-5 overflow-y-auto max-h-[calc(100vh-60px)] hide-scroll">
        <div>
          <DialogTitle className="text-2xl  font-bold text-foreground">{title}</DialogTitle>
          <p className="text-muted-foreground px-1 text-sm">{description}</p>
        </div>
        {cloneElement(children, { onClose: () => setOpen(false) })}
      </DialogContent>
    </Dialog>
  );
};
