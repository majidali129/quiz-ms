"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cloneElement, ReactElement, useState } from "react";

type DialogShellProps = {
  children: ReactElement<{ onClose: () => void }>;
  triggerText: string;
  title: string;
  description: string;
};

export const DialogShell = ({ children, triggerText, title, description }: DialogShellProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:!max-w-3xl gap-5 overflow-y-auto max-h-[calc(100vh-60px)] hide-scroll">
        <div>
          <DialogTitle className="text-3xl  font-bold text-foreground">{title}</DialogTitle>
          <p className="text-muted-foreground px-2 text-sm">{description}</p>
        </div>
        {cloneElement(children, { onClose: () => setOpen(false) })}
      </DialogContent>
    </Dialog>
  );
};
