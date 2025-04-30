"use client";

import { cloneElement, isValidElement, ReactElement, useActionState, useState } from "react";
import { Form } from "./form/form";
import SubmitButton from "./form/submit-button";
import { ActionState, Empty_Action_State } from "./form/utils/to-action-state";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

type UseConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: ReactElement<{ onClick: (e: MouseEvent) => void }>;
};
export const useConfirmDialog = ({ action, description = "This action cannot be undone. Make sure you understand the consequences.", title = "Are you absolutely sure?", trigger }: UseConfirmDialogProps) => {
  const [open, setOpen] = useState(false);
  const [actionState, formAction] = useActionState(action, Empty_Action_State);

  const dialogTrigger =
    isValidElement(trigger) &&
    cloneElement(trigger, {
      onClick: (e) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
      },
    });

  const dialog = (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form action={formAction} onSuccess={() => setOpen(false)} actionState={actionState}>
              <SubmitButton label="Confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [dialogTrigger, dialog] as const;
};
